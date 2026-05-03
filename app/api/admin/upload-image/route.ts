import { NextResponse } from "next/server"
import { getAdminSupabase, isAdminRequest } from "@/lib/admin/server"

const BUCKET = "ebook-images"

function safeFileName(name: string) {
  const extension = name.split(".").pop()?.toLowerCase() || "webp"
  const base = name
    .replace(/\.[^/.]+$/, "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48)

  return `${base || "imagem"}-${Date.now()}.${extension}`
}

export async function POST(request: Request) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Acesso negado." }, { status: 401 })
  }

  const formData = await request.formData()
  const file = formData.get("file")

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Arquivo de imagem obrigatório." }, { status: 400 })
  }

  if (!file.type.startsWith("image/")) {
    return NextResponse.json({ error: "Envie apenas imagens." }, { status: 400 })
  }

  const supabase = getAdminSupabase()

  const { error: bucketError } = await supabase.storage.createBucket(BUCKET, {
    public: true,
    fileSizeLimit: 1024 * 1024 * 8,
    allowedMimeTypes: ["image/jpeg", "image/png", "image/webp", "image/avif"],
  })

  if (bucketError && !bucketError.message.toLowerCase().includes("already")) {
    return NextResponse.json({ error: bucketError.message }, { status: 500 })
  }

  const buffer = Buffer.from(await file.arrayBuffer())
  const path = `receitas/${safeFileName(file.name)}`
  const { error } = await supabase.storage.from(BUCKET).upload(path, buffer, {
    contentType: file.type,
    upsert: false,
  })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path)

  return NextResponse.json({ url: data.publicUrl, path })
}
