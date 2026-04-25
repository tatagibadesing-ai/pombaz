import type { CSSProperties } from "react"
import type { Metadata } from "next"
import { ArrowRight, Menu } from "lucide-react"
import { Reveal } from "@/components/pombaz/reveal"
import { ReceitaMagicaVideo } from "./receita-magica-video"

export const metadata: Metadata = {
  title: "Receita Mágica | POMBAZ",
  description:
    "30 receitas práticas para emagrecer de verdade, com acesso imediato pela POMBAZ.",
}

const blueTheme = {
  "--brand-yellow": "#399cff",
  "--brand-yellow-rgb": "57, 156, 255",
} as CSSProperties

export default function ReceitaMagicaPage() {
  return (
    <main
      className="pombaz-blue-theme min-h-screen overflow-hidden bg-black text-white"
      style={blueTheme}
    >
      <section
        id="top"
        className="relative min-h-[100svh] overflow-hidden border-b border-[color:var(--border-subtle)] bg-black pt-24 lg:h-[100svh] lg:pt-32"
      >
        <header className="fixed inset-x-0 top-0 z-[100] border-b border-transparent bg-transparent">
          <div className="mx-auto max-w-7xl px-6 md:px-0">
            <div className="flex h-16 items-center justify-between md:h-20">
              <a href="/" className="flex items-center gap-3" aria-label="POMBAZ">
                <img
                  src="/Pombazlogo.webp"
                  alt="POMBAZ"
                  width={34}
                  height={34}
                  className="h-[34px] w-[34px] rounded-[6px] object-contain"
                />
                <span className="font-[family:var(--font-heading)] text-xl font-bold tracking-[-0.03em] text-[color:var(--text-primary)] md:text-2xl">
                  POMBAZ
                </span>
              </a>

              <div className="flex items-center gap-3">
                <a href="#comprar" className="pombaz-button pombaz-button-outline group hidden lg:inline-flex">
                  Quero agora · R$16,90
                  <ArrowRight className="h-3.5 w-3.5 pombaz-arrow" />
                </a>

                <button
                  type="button"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-[color:var(--border-subtle)] bg-[rgba(10,10,10,0.55)] text-[color:var(--text-primary)] backdrop-blur md:hidden"
                  aria-label="Abrir menu"
                >
                  <Menu className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </header>

        <div className="relative mx-auto grid min-h-[calc(100svh-6rem)] max-w-7xl grid-rows-[auto_1fr] items-start gap-0 px-6 md:px-0 lg:h-full lg:min-h-0 lg:grid-cols-[minmax(0,1.35fr)_minmax(360px,1fr)] lg:grid-rows-1 lg:items-center lg:gap-6">
          <div className="relative z-[90] mx-auto w-full max-w-[52rem] self-start pt-4 text-center lg:mx-0 lg:z-10 lg:self-center lg:pt-0 lg:text-left">
            <Reveal>
              <span className="pombaz-label">— POMBAZ · RECEITA MÁGICA</span>
            </Reveal>

            <Reveal delay={80}>
              <h1 className="pombaz-heading mx-auto mt-3 max-w-[14ch] text-[clamp(25px,7.6vw,32px)] leading-[0.96] text-[color:var(--text-primary)] sm:max-w-[16ch] md:text-[clamp(42px,5.2vw,70px)] lg:mx-0 lg:mt-6 lg:max-w-[13ch]">
                30 receitas para
                <br />
                <span className="pombaz-italic-highlight">emagrecer de verdade.</span>
              </h1>
            </Reveal>

            <Reveal delay={160}>
              <p className="mx-auto mt-4 max-w-[32rem] text-sm leading-relaxed text-[color:var(--text-primary)] sm:text-base md:mt-7 md:text-[1.0625rem] lg:mx-0">
                Receitas práticas, saborosas e fáceis de fazer, criadas para quem quer
                perder peso sem sofrimento e sem abrir mão de comer bem.
              </p>
            </Reveal>

            <Reveal delay={240}>
              <p className="mx-auto mt-4 flex max-w-[24rem] flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-[color:var(--text-secondary)] sm:max-w-none sm:text-sm md:mt-8 lg:mx-0 lg:justify-start">
                <span>Receitas práticas</span>
                <span className="text-[color:var(--text-muted)]">•</span>
                <span>Acesso imediato</span>
                <span className="text-[color:var(--text-muted)]">•</span>
                <span>R$16,90</span>
              </p>
            </Reveal>

            <Reveal delay={320}>
              <div className="mt-4 flex flex-col items-center gap-2 sm:flex-row sm:items-center sm:justify-center lg:mt-10 lg:justify-start lg:gap-4">
                <a id="comprar" href="#" className="pombaz-button group">
                  Quero emagrecer agora
                  <ArrowRight className="h-4 w-4 pombaz-arrow" />
                </a>
                <span className="pombaz-link-secondary inline-flex items-center gap-2">
                  Acesso imediato
                </span>
              </div>
            </Reveal>
          </div>

          <Reveal delay={180} className="pointer-events-none relative z-10 -mt-3 flex h-[44svh] min-h-[280px] items-end justify-center self-end overflow-hidden lg:z-[60] lg:mt-0 lg:h-full lg:min-h-[360px] lg:justify-end lg:overflow-visible">
            <div className="relative flex h-full w-full items-end justify-center overflow-visible lg:justify-end">
              <ReceitaMagicaVideo />
            </div>
          </Reveal>
        </div>

        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[80] h-40 bg-gradient-to-b from-transparent via-black/65 to-black"
          aria-hidden="true"
        />
      </section>
    </main>
  )
}
