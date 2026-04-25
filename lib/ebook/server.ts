import { createHmac, timingSafeEqual } from "node:crypto"
import { cookies } from "next/headers"
import { getAdminSupabase } from "@/lib/admin/server"

const EMAIL_COOKIE = "pombaz_ebook_email"
const SIGNATURE_COOKIE = "pombaz_ebook_signature"

function signEmail(email: string) {
  const secret = process.env.ADMIN_SESSION_SECRET ?? process.env.ADMIN_PASSWORD ?? "pombaz"
  return createHmac("sha256", secret).update(email.toLowerCase()).digest("hex")
}

export async function setEbookCookie(email: string) {
  const store = await cookies()
  const normalizedEmail = email.toLowerCase()

  store.set(EMAIL_COOKIE, normalizedEmail, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  })
  store.set(SIGNATURE_COOKIE, signEmail(normalizedEmail), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  })
}

export async function clearEbookCookie() {
  const store = await cookies()
  store.delete(EMAIL_COOKIE)
  store.delete(SIGNATURE_COOKIE)
}

export async function getEbookSessionEmail() {
  const store = await cookies()
  const email = store.get(EMAIL_COOKIE)?.value
  const signature = store.get(SIGNATURE_COOKIE)?.value

  if (!email || !signature) return null

  try {
    const expected = signEmail(email)
    const valid = timingSafeEqual(Buffer.from(signature), Buffer.from(expected))
    return valid ? email : null
  } catch {
    return null
  }
}

export async function hasEbookAccess(email: string) {
  const supabase = getAdminSupabase()
  const { data, error } = await supabase
    .from("ebook_access")
    .select("id")
    .eq("email", email.toLowerCase())
    .eq("has_access", true)
    .limit(1)

  if (error) throw error
  return Boolean(data?.length)
}

export async function getAccessibleProducts(email: string) {
  const supabase = getAdminSupabase()
  const { data, error } = await supabase
    .from("ebook_access")
    .select("product_id, ebook_products(id,title,slug,description,accent_color,accent_rgb,sort_order,is_active,created_at,updated_at)")
    .eq("email", email.toLowerCase())
    .eq("has_access", true)
    .order("created_at", { ascending: true })

  if (error) throw error

  const rows = (data ?? []) as Array<{
    ebook_products:
      | {
          id: string
          title: string
          slug: string
          description: string | null
          accent_color: string
          accent_rgb: string
          sort_order: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
      | null
  }>

  return rows
    .map((item) => item.ebook_products)
    .filter(Boolean)
    .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
}
