import { ArrowRight } from "lucide-react"
import { Reveal } from "./reveal"

export function FinalCta() {
  return (
    <section id="contato" className="relative overflow-hidden border-t border-[color:var(--border-subtle)]">
      <div className="absolute inset-0 pombaz-glow-center opacity-80" aria-hidden="true" />

      <div className="relative mx-auto max-w-4xl px-6 py-24 text-center md:py-32 lg:px-10">
        <Reveal>
          <span className="pombaz-label text-[color:var(--label-muted)]">Comece hoje</span>
        </Reveal>

        <Reveal delay={80}>
          <h2 className="pombaz-heading mt-6 text-[clamp(2.7rem,6vw,5rem)] leading-[0.98] text-[color:var(--text-primary)]">
            Escolha seu produto.
            <br />
            Comece <span className="pombaz-italic-highlight">agora.</span>
          </h2>
        </Reveal>

        <Reveal delay={160}>
          <p className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-[color:var(--text-primary)] md:text-lg">
            Entrega imediata. Acesso vitalício. Sem risco.
          </p>
        </Reveal>

        <Reveal delay={240}>
          <div className="mt-12 flex justify-center">
            <a href="#produtos" className="pombaz-button group">
              Ver Todos os Produtos
              <ArrowRight className="h-4 w-4 pombaz-arrow" />
            </a>
          </div>
        </Reveal>

        <Reveal delay={320}>
          <p className="mt-10 text-[10px] uppercase tracking-[0.24em] text-[color:var(--text-muted)] md:text-[11px]">
            PAGAMENTO SEGURO • ACESSO IMEDIATO
          </p>
        </Reveal>
      </div>
    </section>
  )
}
