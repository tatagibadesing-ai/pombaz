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

  const { rawText } = (await request.json()) as { rawText?: string }

  if (!rawText || rawText.trim().length < 20) {
    return NextResponse.json({ error: "Envie um texto maior para a IA organizar." }, { status: 400 })
  }

  const prompt = `
Você é um especialista em educação física e biomecânica da POMBAZ.
Transforme o texto bruto abaixo em exercícios estruturados para um protocolo de treino.

Responda SOMENTE com JSON válido, sem markdown, no formato:
[
  {
    "title": "Nome do exercício",
    "paragraph_anatomy": "Parágrafo completo sobre importância anatômica e estabilização muscular deste exercício. Explique quais músculos são recrutados, quais estabilizadores atuam e por que esse movimento é importante para a saúde postural e funcional.",
    "paragraph_technique": "Parágrafo completo sobre instrução técnica de execução. Descreva o posicionamento inicial, o movimento em si (fase concêntrica e excêntrica), o controle respiratório e os pontos críticos de atenção para uma execução correta e segura.",
    "paragraph_sets": "Parágrafo completo com opções de séries e repetições adaptadas para diferentes biotipos. Iniciante: descreva volume e carga. Magro (ectomorfo): descreva volume e carga. Gordo (endomorfo): descreva volume e carga. Forte (mesomorfo avançado): descreva volume e carga."
  }
]

Regras:
- Crie um objeto por exercício mencionado no texto.
- Cada parágrafo deve ser detalhado, fluido e em português do Brasil.
- Não use bullets nem listas dentro dos parágrafos, apenas texto corrido.
- O paragraph_sets DEVE mencionar explicitamente os quatro biotipos: Iniciante, Magro, Gordo e Forte.
- Não invente exercícios que não estejam no texto original.
- Limite a no máximo 10 exercícios.

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
          temperature: 0.4,
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
    const exercises = JSON.parse(text)
    return NextResponse.json({ exercises })
  } catch {
    return NextResponse.json({ error: "A IA devolveu JSON inválido.", raw: text }, { status: 500 })
  }
}
