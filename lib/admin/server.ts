import { createHmac, timingSafeEqual } from "node:crypto"
import { cookies } from "next/headers"
import { createClient } from "@supabase/supabase-js"

const COOKIE_NAME = "pombaz_admin_session"
const SESSION_VALUE = "pombaz-admin"

export function getAdminSessionValue() {
  const secret = process.env.ADMIN_SESSION_SECRET ?? process.env.ADMIN_PASSWORD ?? "pombaz"
  return createHmac("sha256", secret).update(SESSION_VALUE).digest("hex")
}

export async function isAdminRequest() {
  const store = await cookies()
  const cookieValue = store.get(COOKIE_NAME)?.value
  const expected = getAdminSessionValue()

  if (!cookieValue) return false

  try {
    return timingSafeEqual(Buffer.from(cookieValue), Buffer.from(expected))
  } catch {
    return false
  }
}

export async function setAdminCookie() {
  const store = await cookies()
  store.set(COOKIE_NAME, getAdminSessionValue(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12,
  })
}

export async function clearAdminCookie() {
  const store = await cookies()
  store.delete(COOKIE_NAME)
}

export function getAdminSupabase() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const secretKey = process.env.SUPABASE_SECRET_KEY

  if (!supabaseUrl || !secretKey) {
    throw new Error("Supabase server env vars ausentes.")
  }

  return createClient(supabaseUrl, secretKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  })
}
