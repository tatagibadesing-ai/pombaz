import { NextResponse } from "next/server"
import { clearEbookCookie, getEbookSessionEmail, hasEbookAccess, setEbookCookie } from "@/lib/ebook/server"

const USER_PASSWORD = "6767"

export async function GET() {
  const email = await getEbookSessionEmail()
  if (!email) return NextResponse.json({ authenticated: false })

  try {
    const hasAccess = await hasEbookAccess(email)
    return NextResponse.json({ authenticated: hasAccess, email: hasAccess ? email : null })
  } catch (error) {
    return NextResponse.json(
      { authenticated: false, error: error instanceof Error ? error.message : "Erro ao validar acesso." },
      { status: 500 },
    )
  }
}

export async function POST(request: Request) {
  const { email, password } = (await request.json()) as { email?: string; password?: string }
  const normalizedEmail = email?.trim().toLowerCase()

  if (!normalizedEmail || password !== USER_PASSWORD) {
    return NextResponse.json({ error: "Email ou senha incorretos." }, { status: 401 })
  }

  try {
    const hasAccess = await hasEbookAccess(normalizedEmail)

    if (!hasAccess) {
      return NextResponse.json({ error: "Esse email ainda nao foi liberado." }, { status: 403 })
    }

    await setEbookCookie(normalizedEmail)
    return NextResponse.json({ authenticated: true, email: normalizedEmail })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Erro ao entrar no ebook." },
      { status: 500 },
    )
  }
}

export async function DELETE() {
  await clearEbookCookie()
  return NextResponse.json({ ok: true })
}
