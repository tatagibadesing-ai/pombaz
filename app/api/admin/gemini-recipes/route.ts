import { NextResponse } from "next/server"
import { isAdminRequest } from "@/lib/admin/server"

type GeminiResponse = {
  candidates?: Array<{
    content?: {
      parts?: Array<{ text?: string }>
    }
  }>
}

export async function POST(request: Request) {
  const geminiKey = process.env.GEMINI_API_KEY
  const geminiModel = process.env.GEMINI_MODEL ?? "gemini-2.5-flash"

  if (!geminiKey) {
    return NextResponse.json({ error: "GEMINI_API_KEY ausente." }, { status: 500 })
  }

  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Acesso negado." }, { status: 403 })
  }

  const { rawText, productTitle } = (await request.json()) as { rawText?: string; productTitle?: string }

  if (!rawText || rawText.trim().length < 20) {
    return NextResponse.json({ error: "Envie um texto maior para a IA organizar." }, { status: 400 })
  }

  const prompt = `
Você é o editor de ebooks da POMBAZ.
Produto/ebook selecionado: ${productTitle || "ebook de receitas"}.
Transforme o texto bruto abaixo em receitas estruturadas para esse produto.

Responda SOMENTE com JSON valido, sem markdown, no formato:
[
  {
    "category_title": "Café da Manhã",
    "title": "Nome da receita",
    "subtitle": "Resumo curto e convincente",
    "ingredients": ["ingrediente com quantidade"],
    "preparation_steps": ["passo objetivo"],
    "nutrition": {
      "calorias": "000 kcal",
      "proteinas": "00 g",
      "carboidratos": "00 g",
      "gorduras": "00 g"
    },
    "notes": "observação curta opcional"
  }
]

Regras:
- Separe por categorias quando o texto indicar.
- Quando o texto vier com "Página", "Seção", "Café da Manhã", "Almoço", "Jantar" ou blocos parecidos, use isso como "category_title".
- Quando vierem várias receitas em sequência, crie um objeto por receita e preserve a ordem original.
- Se uma informação nutricional não existir, estime com prudência e marque como "aprox.".
- Escreva em português do Brasil.
- Não invente promessas médicas.
- Mantenha ingredientes e preparo simples para celular.
- Ajuste o tom ao produto selecionado, sem misturar receitas de objetivos diferentes quando o texto separar públicos.

Texto bruto:
${rawText}
`

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${geminiModel}:generateContent?key=${geminiKey}`,
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.35,
          responseMimeType: "application/json",
        },
      }),
    },
  )

  if (!response.ok) {
    const body = await response.text()
    return NextResponse.json({ error: `Gemini falhou: ${body}` }, { status: 500 })
  }

  const gemini = (await response.json()) as GeminiResponse
  const text = gemini.candidates?.[0]?.content?.parts?.[0]?.text

  if (!text) {
    return NextResponse.json({ error: "A IA não devolveu conteúdo." }, { status: 500 })
  }

  try {
    const drafts = JSON.parse(text)
    return NextResponse.json({ drafts })
  } catch {
    return NextResponse.json({ error: "A IA devolveu JSON inválido.", raw: text }, { status: 500 })
  }
}
