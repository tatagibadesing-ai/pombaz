import { NextResponse } from "next/server"
import { clearAdminCookie, isAdminRequest, setAdminCookie } from "@/lib/admin/server"

export async function GET() {
  return NextResponse.json({ authenticated: await isAdminRequest() })
}

export async function POST(request: Request) {
  const { password } = (await request.json()) as { password?: string }

  if (!password || password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Senha incorreta." }, { status: 401 })
  }

  await setAdminCookie()
  return NextResponse.json({ ok: true })
}

export async function DELETE() {
  await clearAdminCookie()
  return NextResponse.json({ ok: true })
}
