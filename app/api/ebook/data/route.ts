import { NextResponse } from "next/server"
import { getAdminSupabase } from "@/lib/admin/server"
import { getAccessibleProducts, getEbookSessionEmail, hasEbookAccess } from "@/lib/ebook/server"

export async function GET(request: Request) {
  const email = await getEbookSessionEmail()

  if (!email || !(await hasEbookAccess(email))) {
    return NextResponse.json({ error: "Acesso negado." }, { status: 401 })
  }

  const supabase = getAdminSupabase()
  const products = await getAccessibleProducts(email)
  const requestedProductId = new URL(request.url).searchParams.get("productId")
  const selectedProduct =
    products.find((product) => product.id === requestedProductId) ?? products[0] ?? null

  if (!selectedProduct) {
    return NextResponse.json({ error: "Nenhum ebook liberado para esse email." }, { status: 403 })
  }

  const [{ data: categories, error: categoriesError }, { data: recipes, error: recipesError }] =
    await Promise.all([
      supabase
        .from("ebook_categories")
        .select("*")
        .eq("product_id", selectedProduct.id)
        .eq("is_published", true)
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: true }),
      supabase
        .from("ebook_recipes")
        .select("*, ebook_categories(id,title,slug,sort_order)")
        .in("category_id", await getCategoryIdsForProduct(supabase, selectedProduct.id))
        .eq("is_published", true)
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: true }),
    ])

  const error = categoriesError ?? recipesError
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ email, products, selectedProduct, categories, recipes })
}

async function getCategoryIdsForProduct(supabase: ReturnType<typeof getAdminSupabase>, productId: string) {
  const { data, error } = await supabase
    .from("ebook_categories")
    .select("id")
    .eq("product_id", productId)

  if (error) throw error
  const ids = (data ?? []).map((category) => category.id)
  return ids.length ? ids : ["00000000-0000-0000-0000-000000000000"]
}
