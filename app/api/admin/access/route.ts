import { NextResponse } from "next/server"
import { getAdminSupabase, isAdminRequest } from "@/lib/admin/server"

export async function POST(request: Request) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Acesso negado." }, { status: 401 })
  }

  const { email, productId } = (await request.json()) as { email?: string; productId?: string }

  if (!email?.trim() || !productId) {
    return NextResponse.json({ error: "Email e produto são obrigatórios." }, { status: 400 })
  }

  const supabase = getAdminSupabase()
  const normalizedEmail = email.trim().toLowerCase()

  const { error } = await supabase.from("ebook_access").upsert(
    {
      email: normalizedEmail,
      product_id: productId,
      has_access: true,
    },
    { onConflict: "email,product_id" },
  )

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ ok: true })
}

export async function PATCH(request: Request) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Acesso negado." }, { status: 401 })
  }

  const { id, hasAccess } = (await request.json()) as { id?: string; hasAccess?: boolean }

  if (!id) return NextResponse.json({ error: "ID obrigatório." }, { status: 400 })

  const supabase = getAdminSupabase()
  const { error } = await supabase.from("ebook_access").update({ has_access: hasAccess ?? false }).eq("id", id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ ok: true })
}
