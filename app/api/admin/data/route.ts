import { NextResponse } from "next/server"
import { getAdminSupabase, isAdminRequest } from "@/lib/admin/server"

export async function GET() {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Acesso negado." }, { status: 401 })
  }

  const supabase = getAdminSupabase()

  const [
    { data: products, error: productsError },
    { data: categories, error: categoriesError },
    { data: recipes, error: recipesError },
    { data: accessList, error: accessError },
  ] =
    await Promise.all([
      supabase
        .from("ebook_products")
        .select("*")
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: true }),
      supabase
        .from("ebook_categories")
        .select("*, ebook_products(id,title,slug,accent_color,accent_rgb)")
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: true }),
      supabase
        .from("ebook_recipes")
        .select("*, ebook_categories(id,title,slug,sort_order)")
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: true }),
      supabase
        .from("ebook_access")
        .select("*, ebook_products(id,title,slug,accent_color,accent_rgb)")
        .order("created_at", { ascending: false }),
    ])

  const error = productsError ?? categoriesError ?? recipesError ?? accessError
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ products, categories, recipes, accessList })
}
