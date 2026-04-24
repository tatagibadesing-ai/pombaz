import { Eye, Target, TrendingUp, Zap } from "lucide-react"
import { Reveal } from "./reveal"

const pillars = [
  {
    title: "Personagem própria",
    description:
      "Uma pomba com identidade visual única que o público reconhece em qualquer plataforma.",
    icon: Eye,
  },
  {
    title: "Produtos que entregam",
    description:
      "Cada produto resolve uma dor real. Sem promessa vazia, sem enrolação.",
    icon: Target,
  },
  {
    title: "Sistema com IA",
    description:
      "Conteúdo produzido com inteligência artificial — consistente, escalável e com identidade.",
    icon: Zap,
  },
  {
    title: "Crescimento contínuo",
    description:
      "Catálogo em expansão. Cada lançamento mais preciso que o anterior.",
    icon: TrendingUp,
  },
]

export function About() {
  return (
    <section id="sobre" className="border-t border-[color:var(--border-subtle)]">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-10 lg:gap-16">
          <div className="lg:col-span-4">
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

          <div className="lg:col-span-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5">
              {pillars.map((pillar, index) => {
                const Icon = pillar.icon

                return (
                  <Reveal key={pillar.title} delay={120 + index * 90} className="h-full">
                    <div
                      className="pombaz-card h-full rounded-[8px] border border-[#1e1e1e] bg-[#0f0f0f] p-7 hover:border-[color:var(--brand-yellow)] hover:shadow-[0_0_12px_rgba(240,192,0,0.15)]"
                      data-cursor="hover"
                    >
                      <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(240,192,0,0.18)] bg-[rgba(240,192,0,0.03)]">
                        <Icon className="h-5 w-5 text-[color:var(--brand-yellow)]" strokeWidth={1.7} />
                      </div>
                      <h3 className="mt-5 font-[family:var(--font-heading)] text-xl font-bold tracking-[-0.02em] text-[color:var(--text-primary)]">
                        {pillar.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-[color:var(--text-secondary)]">
                        {pillar.description}
                      </p>
                    </div>
                  </Reveal>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
