import { ArrowRight } from "lucide-react"
import { Reveal } from "./reveal"

export function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-[100svh] overflow-hidden border-b border-[color:var(--border-subtle)] bg-black pt-24 lg:h-[100svh] lg:pt-32"
    >
      <div className="relative mx-auto grid min-h-[calc(100svh-6rem)] max-w-7xl grid-rows-[auto_1fr] items-start gap-0 px-6 lg:h-full lg:min-h-0 lg:grid-cols-[minmax(0,1.35fr)_minmax(360px,1fr)] lg:grid-rows-1 lg:items-center lg:gap-6 lg:px-0">
        <div className="relative z-[90] mx-auto w-full max-w-[52rem] self-start pt-4 text-center lg:mx-0 lg:z-10 lg:self-center lg:pt-0 lg:text-left">
          <Reveal>
            <span className="pombaz-label">— POMBAZ</span>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="pombaz-heading mx-auto mt-6 max-w-none text-center lg:mx-0 lg:text-left text-[clamp(26px,6.5vw,52px)] leading-[1.15] text-[color:var(--text-primary)]">
              Não é curso.
              <br />
              Não é vídeo.
              <br />
              É atalho direto
              <br />
              <span className="pombaz-italic-highlight">Para o resultado.</span>
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mx-auto mt-4 max-w-[32rem] text-sm leading-relaxed text-[color:var(--text-primary)] sm:text-base md:mt-7 md:text-[1.0625rem] lg:mx-0">
              Protocolos práticos de treino e alimentação. Direto ao ponto, sem enrolação.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <p className="mx-auto mt-4 flex max-w-[24rem] flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-[color:var(--text-secondary)] sm:max-w-none sm:text-sm md:mt-8 lg:mx-0 lg:justify-start">
              <span>A pomba mais famosa do Brasil</span>
              <span className="text-[color:var(--text-muted)]">•</span>
              <span>Produtos digitais</span>
              <span className="text-[color:var(--text-muted)]">•</span>
              <span>Resultado real</span>
            </p>
          </Reveal>

          <Reveal delay={320}>
            <div className="mt-4 flex flex-col items-center gap-2 sm:flex-row sm:justify-center sm:items-center lg:mt-10 lg:justify-start lg:gap-4">
              <a href="#produtos" className="pombaz-button group">
                Ver Produtos
                <ArrowRight className="h-4 w-4 pombaz-arrow" />
              </a>
              <a href="#sobre" className="pombaz-link-secondary inline-flex items-center gap-2">
                Conhecer a marca <span aria-hidden="true">→</span>
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={180} className="pointer-events-none relative z-10 -mt-3 flex h-[44svh] min-h-[280px] items-end justify-center self-end overflow-hidden lg:z-[60] lg:mt-0 lg:h-full lg:min-h-[360px] lg:justify-end lg:overflow-visible">
          <div className="relative flex h-full w-full items-end justify-center overflow-visible lg:justify-end">
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              poster="/Imagetoheropombaz.webp"
              aria-label="Mascote 3D da POMBAZ"
              className="relative z-[20] block h-auto max-h-[44svh] w-auto max-w-none translate-x-0 select-none self-end sm:max-h-[52svh] lg:z-[70] lg:max-h-[90svh] lg:translate-x-[14%]"
            >
              <source src="/heropombaz.mp4" type="video/mp4" />
            </video>
          </div>
        </Reveal>
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[80] h-40 bg-gradient-to-b from-transparent via-black/65 to-[color:var(--bg-primary)]"
        aria-hidden="true"
      />
    </section>
  )
}
