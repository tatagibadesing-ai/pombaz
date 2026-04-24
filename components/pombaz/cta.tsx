import { ArrowRight } from "lucide-react"
import { Reveal } from "./reveal"

export function FinalCta() {
  return (
    <section id="contato" className="relative overflow-hidden border-t border-[color:var(--border-subtle)]">
      <div className="absolute inset-0 pombaz-glow-center opacity-80" aria-hidden="true" />

      <div className="relative mx-auto max-w-4xl px-6 py-16 text-center md:py-32 lg:px-10">
        <Reveal>
          <span className="pombaz-label text-[color:var(--label-muted)]">Comece hoje</span>
        </Reveal>

        <Reveal delay={80}>
          <h2 className="pombaz-heading mt-4 text-[clamp(2rem,9vw,2.75rem)] leading-[0.98] text-[color:var(--text-primary)] md:mt-6 md:text-[clamp(2.7rem,6vw,5rem)]">
            Escolha seu produto.
            <br />
            Comece <span className="pombaz-italic-highlight">agora.</span>
          </h2>
        </Reveal>

        <Reveal delay={160}>
          <p className="mx-auto mt-6 max-w-sm text-sm leading-relaxed text-[color:var(--text-primary)] md:mt-8 md:max-w-xl md:text-lg">
            Entrega imediata. Acesso vitalício. Sem risco.
          </p>
        </Reveal>

        <Reveal delay={240}>
          <div className="mt-9 flex justify-center md:mt-12">
            <a href="#produtos" className="pombaz-button group w-full max-w-[292px] md:w-auto md:max-w-none">
              Ver Todos os Produtos
              <ArrowRight className="h-4 w-4 pombaz-arrow" />
            </a>
          </div>
        </Reveal>

        <Reveal delay={320}>
          <p className="mx-auto mt-8 max-w-[260px] text-[9px] uppercase tracking-[0.22em] text-[color:var(--text-muted)] md:mt-10 md:max-w-none md:text-[11px]">
            PAGAMENTO SEGURO • ACESSO IMEDIATO
          </p>
        </Reveal>
      </div>
    </section>
  )
}
