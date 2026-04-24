import { Reveal } from "./reveal"

const pillars = [
  {
    title: "Personagem própria",
    description:
      "Uma pomba com identidade visual única que o público reconhece em qualquer plataforma.",
    visual: "identity",
  },
  {
    title: "Produtos que entregam",
    description:
      "Cada produto resolve uma dor real. Sem promessa vazia, sem enrolação.",
    visual: "products",
  },
  {
    title: "Sistema com IA",
    description:
      "Conteúdo produzido com inteligência artificial — consistente, escalável e com identidade.",
    visual: "system",
  },
  {
    title: "Crescimento contínuo",
    description:
      "Catálogo em expansão. Cada lançamento mais preciso que o anterior.",
    visual: "growth",
  },
] as const

type VisualType = (typeof pillars)[number]["visual"]

function CardVisual({ type }: { type: VisualType }) {
  if (type === "identity") {
    return (
      <div className="relative mt-8 h-40 overflow-hidden rounded-2xl border border-white/5 bg-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(240,192,0,0.14),transparent_58%)]" />
        <div className="absolute left-1/2 top-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white/80 text-3xl font-bold text-white shadow-[0_0_34px_rgba(240,192,0,0.16)]">
          P
        </div>
        <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-[10px] uppercase tracking-[0.18em] text-[color:var(--text-secondary)]">
          <span>Recall</span>
          <span className="text-[color:var(--brand-yellow)]">98%</span>
        </div>
      </div>
    )
  }

  if (type === "products") {
    return (
      <div className="relative mt-8 h-40 overflow-hidden rounded-2xl border border-white/5 bg-black p-5">
        <div className="space-y-3">
          {["Dor real", "Entrega", "Acesso"].map((label, index) => (
            <div key={label} className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.03] px-4 py-3">
              <span className="text-xs text-[color:var(--text-secondary)]">{label}</span>
              <span className="rounded-md bg-[rgba(240,192,0,0.12)] px-2 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[color:var(--brand-yellow)]">
                {index === 0 ? "Mapeado" : index === 1 ? "Pronto" : "Imediato"}
              </span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (type === "system") {
    return (
      <div className="relative mt-8 h-40 overflow-hidden rounded-2xl border border-white/5 bg-black p-5">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="relative grid h-full grid-cols-3 items-end gap-3">
          {[44, 66, 88].map((height, index) => (
            <div key={height} className="flex flex-col items-center gap-3">
              <div
                className="w-full rounded-t-xl bg-gradient-to-t from-[rgba(240,192,0,0.22)] to-[rgba(240,192,0,0.75)]"
                style={{ height }}
              />
              <span className="text-[10px] uppercase tracking-[0.14em] text-[color:var(--text-muted)]">
                IA {index + 1}
              </span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="relative mt-8 h-40 overflow-hidden rounded-2xl border border-white/5 bg-black">
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 360 160" fill="none" aria-hidden="true">
        <path
          d="M0 118C38 104 62 126 101 107C133 91 145 96 173 84C211 68 221 38 263 35C298 32 325 42 360 29"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M0 132C42 116 65 136 104 118C134 104 150 108 178 95C216 78 226 52 266 49C302 46 326 55 360 43V160H0V132Z"
          fill="url(#growth-fill)"
        />
        <defs>
          <linearGradient id="growth-fill" x1="180" y1="43" x2="180" y2="160" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F0C000" stopOpacity="0.2" />
            <stop offset="1" stopColor="#F0C000" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute left-6 top-6 rounded-xl border border-white/5 bg-white/[0.04] px-4 py-3">
        <span className="block text-[10px] uppercase tracking-[0.16em] text-[color:var(--text-muted)]">
          Expansão
        </span>
        <span className="mt-1 block font-[family:var(--font-heading)] text-lg font-bold text-white">
          +124.5%
        </span>
      </div>
    </div>
  )
}

export function About() {
  return (
    <section id="sobre" className="border-t border-[color:var(--border-subtle)]">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28 lg:px-0">
        <div className="grid gap-12 lg:grid-cols-10 lg:gap-16">
          <div className="lg:col-span-4 lg:col-start-7 lg:row-start-1">
            <Reveal>
              <span className="pombaz-label">A Marca</span>
            </Reveal>

            <Reveal delay={80}>
              <h2 className="pombaz-heading mt-6 text-[clamp(2.6rem,5vw,4.2rem)] leading-[1] text-[color:var(--text-primary)]">
                A pomba
                <br />
                é a <span className="pombaz-italic-highlight">marca.</span>
              </h2>
            </Reveal>

            <Reveal delay={160}>
              <p className="mt-8 max-w-md text-base leading-relaxed text-[color:var(--text-primary)] md:text-[1.0625rem]">
                A POMBAZ não é só uma loja de produtos digitais. É uma personagem. Um
                sistema. Uma presença que o público reconhece antes de ler qualquer nome.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-6 lg:col-start-1 lg:row-start-1">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {pillars.map((pillar, index) => (
                <Reveal key={pillar.title} delay={120 + index * 90} className="h-full">
                  <div
                    className="pombaz-card group relative h-full overflow-hidden rounded-[1.5rem] border border-[#1e1e1e] bg-[#050505] p-1.5 shadow-2xl shadow-black/50 hover:border-[rgba(240,192,0,0.32)]"
                    data-cursor="hover"
                  >
                    <div className="relative flex h-full flex-col overflow-hidden rounded-[1.15rem] border border-[#202020] bg-[linear-gradient(135deg,#151515_0%,#080808_48%,#111111_100%)] p-7">
                      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-1/2 -translate-x-1/2 bg-gradient-to-r from-transparent via-[rgba(240,192,0,0.62)] to-transparent" />
                      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(240,192,0,0.07),transparent_48%)]" />

                      <div className="relative z-10">
                        <h3 className="font-[family:var(--font-heading)] text-xl font-bold tracking-[-0.02em] text-[color:var(--text-primary)]">
                          {pillar.title}
                        </h3>
                        <p className="mt-3 text-sm leading-relaxed text-[color:var(--text-secondary)]">
                          {pillar.description}
                        </p>
                      </div>

                      <CardVisual type={pillar.visual} />
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
