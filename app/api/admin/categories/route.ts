import { NextResponse } from "next/server"
import { slugify } from "@/lib/ebook/slug"
import { getAdminSupabase, isAdminRequest } from "@/lib/admin/server"

export async function POST(request: Request) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Acesso negado." }, { status: 401 })
  }

  const { productId, title, description, sortOrder } = (await request.json()) as {
    productId?: string
    title?: string
    description?: string
    sortOrder?: number
  }

  if (!productId || !title?.trim()) {
    return NextResponse.json({ error: "Produto e título são obrigatórios." }, { status: 400 })
  }

  const supabase = getAdminSupabase()
  const { data, error } = await supabase
    .from("ebook_categories")
    .insert({
      title: title.trim(),
      slug: `${slugify(title)}-${productId.slice(0, 8)}`,
      product_id: productId,
      description: description?.trim() || null,
      sort_order: sortOrder ?? 0,
      is_published: true,
    })
    .select("*")
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ category: data })
}
