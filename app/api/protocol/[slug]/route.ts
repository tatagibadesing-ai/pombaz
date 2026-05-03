import { NextResponse } from "next/server"
import { getAdminSupabase } from "@/lib/admin/server"

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = getAdminSupabase()

  const { data: guide, error: guideError } = await supabase
    .from("protocol_guides")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .single()

  if (guideError || !guide) {
    return NextResponse.json({ error: "Protocolo não encontrado." }, { status: 404 })
  }

  const { data: exercises, error: exError } = await supabase
    .from("protocol_exercises")
    .select("*")
    .eq("guide_id", guide.id)
    .order("sort_order", { ascending: true })

  if (exError) {
    return NextResponse.json({ error: exError.message }, { status: 500 })
  }

  return NextResponse.json({ guide, exercises: exercises ?? [] })
}
