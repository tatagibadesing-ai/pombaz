import { NextResponse } from "next/server"
import { isAdminRequest } from "@/lib/admin/server"
import { getAdminSupabase } from "@/lib/admin/server"

// GET - list all guides
export async function GET() {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Acesso negado." }, { status: 403 })
  }

  const supabase = getAdminSupabase()
  const { data: guides, error: guidesError } = await supabase
    .from("protocol_guides")
    .select("*")
    .order("sort_order", { ascending: true })

  if (guidesError) {
    return NextResponse.json({ error: guidesError.message }, { status: 500 })
  }

  const { data: exercises, error: exercisesError } = await supabase
    .from("protocol_exercises")
    .select("*")
    .order("sort_order", { ascending: true })

  if (exercisesError) {
    return NextResponse.json({ error: exercisesError.message }, { status: 500 })
  }

  return NextResponse.json({ guides: guides ?? [], exercises: exercises ?? [] })
}

// POST - create guide
export async function POST(request: Request) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Acesso negado." }, { status: 403 })
  }

  const body = await request.json()
  const { title, slug, welcomeText, conclusionText, exercises, sortOrder } = body as {
    title: string
    slug: string
    welcomeText: string
    conclusionText: string
    exercises: Array<{
      title: string
      paragraph_anatomy: string
      paragraph_technique: string
      paragraph_sets: string
      images: Array<{ url: string; caption: string }>
      sort_order: number
    }>
    sortOrder?: number
  }

  if (!title?.trim() || !slug?.trim()) {
    return NextResponse.json({ error: "Título e slug são obrigatórios." }, { status: 400 })
  }

  const supabase = getAdminSupabase()

  const { data: guide, error: guideError } = await supabase
    .from("protocol_guides")
    .insert({
      title: title.trim(),
      slug: slug.trim(),
      welcome_text: welcomeText ?? "",
      conclusion_text: conclusionText ?? "",
      is_published: false,
      sort_order: sortOrder ?? 0,
    })
    .select()
    .single()

  if (guideError) {
    return NextResponse.json({ error: guideError.message }, { status: 500 })
  }

  if (exercises && exercises.length > 0) {
    const rows = exercises.map((ex, i) => ({
      guide_id: guide.id,
      title: ex.title,
      paragraph_anatomy: ex.paragraph_anatomy,
      paragraph_technique: ex.paragraph_technique,
      paragraph_sets: ex.paragraph_sets,
      images: ex.images ?? [],
      sort_order: ex.sort_order ?? i * 10,
    }))

    const { error: exError } = await supabase.from("protocol_exercises").insert(rows)
    if (exError) {
      return NextResponse.json({ error: exError.message }, { status: 500 })
    }
  }

  return NextResponse.json({ guide })
}

// PATCH - update guide or exercise
export async function PATCH(request: Request) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Acesso negado." }, { status: 403 })
  }

  const body = await request.json()
  const supabase = getAdminSupabase()

  if (body.type === "guide") {
    const { id, title, slug, welcomeText, conclusionText, isPublished } = body
    const { error } = await supabase
      .from("protocol_guides")
      .update({
        title,
        slug,
        welcome_text: welcomeText,
        conclusion_text: conclusionText,
        is_published: isPublished,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ ok: true })
  }

  if (body.type === "exercise") {
    const { id, title, paragraph_anatomy, paragraph_technique, paragraph_sets, images } = body
    const { error } = await supabase
      .from("protocol_exercises")
      .update({
        title,
        paragraph_anatomy,
        paragraph_technique,
        paragraph_sets,
        images: images ?? [],
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ ok: true })
  }

  return NextResponse.json({ error: "Tipo inválido." }, { status: 400 })
}

// DELETE - delete guide (cascades exercises)
export async function DELETE(request: Request) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Acesso negado." }, { status: 403 })
  }

  const { id } = (await request.json()) as { id: string }
  const supabase = getAdminSupabase()

  // delete exercises first
  await supabase.from("protocol_exercises").delete().eq("guide_id", id)

  const { error } = await supabase.from("protocol_guides").delete().eq("id", id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ ok: true })
}
