import { ArrowRight } from "lucide-react"
import { Reveal } from "./reveal"

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-[color:var(--border-subtle)] pt-28 pb-16 md:pt-32 md:pb-24"
    >
      <div className="absolute inset-0 pombaz-glow" aria-hidden="true" />
      <div className="absolute inset-0 pombaz-grid opacity-40" aria-hidden="true" />
      <div
        className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-[color:var(--bg-primary)]"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(320px,1fr)] lg:gap-6 lg:px-10">
        <div className="relative z-10 max-w-3xl">
          <Reveal>
            <span className="pombaz-label">— POMBAZ</span>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="pombaz-heading mt-6 max-w-[10.8ch] text-[clamp(48px,6vw,80px)] leading-[0.94] text-balance text-[color:var(--text-primary)]">
              Vídeos que grudam.
              <br />
              Produtos que <span className="pombaz-italic-highlight">vendem.</span>
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-7 max-w-xl text-base leading-relaxed text-[color:var(--text-primary)] md:text-[1.0625rem]">
              A POMBAZ cria conteúdo com IA que captura atenção real — e transforma essa
              atenção em resultado.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <p className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-[color:var(--text-secondary)]">
              <span>Conteúdo com IA</span>
              <span className="text-[color:var(--text-muted)]">•</span>
              <span>Produtos digitais</span>
              <span className="text-[color:var(--text-muted)]">•</span>
              <span>Resultado real</span>
            </p>
          </Reveal>

          <Reveal delay={320}>
            <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
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

        <Reveal delay={180} className="relative h-[360px] min-h-[360px] sm:h-[460px] lg:h-[720px]">
          <div className="absolute inset-y-2 right-[-14%] left-[4%] sm:right-[-10%] lg:left-[10%]">
            <img
              src="/pomba-hero.jpg"
              alt="Mascote 3D da POMBAZ"
              className="pombaz-float h-full w-full select-none object-contain object-right"
              draggable={false}
            />
          </div>
          <div
            className="absolute inset-y-[10%] right-[-12%] left-[22%] rounded-full bg-[radial-gradient(circle,rgba(240,192,0,0.16)_0%,rgba(240,192,0,0.05)_36%,transparent_72%)] blur-3xl"
            aria-hidden="true"
          />
        </Reveal>
      </div>
    </section>
  )
}
