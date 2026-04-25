import { NextResponse } from "next/server"
import { getAdminSupabase, isAdminRequest } from "@/lib/admin/server"

type RecipeBody = {
  categoryId?: string
  title?: string
  subtitle?: string
  imageUrl?: string
  ingredients?: string[]
  preparationSteps?: string[]
  nutrition?: Record<string, string | number>
  notes?: string
  sortOrder?: number
}

export async function POST(request: Request) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Acesso negado." }, { status: 401 })
  }

  const body = (await request.json()) as RecipeBody

  if (!body.categoryId || !body.title?.trim()) {
    return NextResponse.json({ error: "Categoria e titulo sao obrigatorios." }, { status: 400 })
  }

  const supabase = getAdminSupabase()
  const { data, error } = await supabase
    .from("ebook_recipes")
    .insert({
      category_id: body.categoryId,
      title: body.title.trim(),
      subtitle: body.subtitle?.trim() || null,
      image_url: body.imageUrl?.trim() || null,
      ingredients: body.ingredients ?? [],
      preparation_steps: body.preparationSteps ?? [],
      nutrition: body.nutrition ?? {},
      notes: body.notes?.trim() || null,
      sort_order: body.sortOrder ?? 0,
      is_published: true,
    })
    .select("*")
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ recipe: data })
}

export async function DELETE(request: Request) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Acesso negado." }, { status: 401 })
  }

  const { id } = (await request.json()) as { id?: string }

  if (!id) return NextResponse.json({ error: "ID obrigatorio." }, { status: 400 })

  const supabase = getAdminSupabase()
  const { error } = await supabase.from("ebook_recipes").delete().eq("id", id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ ok: true })
}

export async function PATCH(request: Request) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Acesso negado." }, { status: 401 })
  }

  const body = (await request.json()) as RecipeBody & { id?: string; isPublished?: boolean }

  if (!body.id || !body.categoryId || !body.title?.trim()) {
    return NextResponse.json({ error: "ID, categoria e titulo sao obrigatorios." }, { status: 400 })
  }

  const supabase = getAdminSupabase()
  const { data, error } = await supabase
    .from("ebook_recipes")
    .update({
      category_id: body.categoryId,
      title: body.title.trim(),
      subtitle: body.subtitle?.trim() || null,
      image_url: body.imageUrl?.trim() || null,
      ingredients: body.ingredients ?? [],
      preparation_steps: body.preparationSteps ?? [],
      nutrition: body.nutrition ?? {},
      notes: body.notes?.trim() || null,
      sort_order: body.sortOrder ?? 0,
      is_published: body.isPublished ?? true,
    })
    .eq("id", body.id)
    .select("*")
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ recipe: data })
}
