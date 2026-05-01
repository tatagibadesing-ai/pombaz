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
Voce e um especialista em educacao fisica e biomecânica da POMBAZ.
Transforme o texto bruto abaixo em exercicios estruturados para um protocolo de treino.

Responda SOMENTE com JSON valido, sem markdown, no formato:
[
  {
    "title": "Nome do exercicio",
    "paragraph_anatomy": "Paragrafo completo sobre importancia anatomica e estabilizacao muscular deste exercicio. Explique quais musculos sao recrutados, quais estabilizadores atuam e por que esse movimento e importante para a saude postural e funcional.",
    "paragraph_technique": "Paragrafo completo sobre instrucao tecnica de execucao. Descreva o posicionamento inicial, o movimento em si (fase concentrica e excentrica), o controle respiratorio e os pontos criticos de atencao para uma execucao correta e segura.",
    "paragraph_sets": "Paragrafo completo com opcoes de series e repeticoes adaptadas para diferentes biotipos. Iniciante: descreva volume e carga. Magro (ectomorfo): descreva volume e carga. Gordo (endomorfo): descreva volume e carga. Forte (mesomorfo avancado): descreva volume e carga."
  }
]

Regras:
- Crie um objeto por exercicio mencionado no texto.
- Cada paragrafo deve ser detalhado, fluido e em portugues do Brasil.
- Nao use bullets nem listas dentro dos paragrafos, apenas texto corrido.
- O paragraph_sets DEVE mencionar explicitamente os quatro biotipos: Iniciante, Magro, Gordo e Forte.
- Nao invente exercicios que nao estejam no texto original.
- Limite a no maximo 10 exercicios.

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
    return NextResponse.json({ error: "A IA nao devolveu conteudo." }, { status: 500 })
  }

  try {
    const exercises = JSON.parse(text)
    return NextResponse.json({ exercises })
  } catch {
    return NextResponse.json({ error: "A IA devolveu JSON invalido.", raw: text }, { status: 500 })
  }
}
