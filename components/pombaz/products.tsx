import { ArrowRight } from "lucide-react"
import { Reveal } from "./reveal"

const product = {
  tag: "NUTRIÇÃO - E-BOOK",
  title: "30 Receitas para Ganhar Massa Muscular",
  description:
    "Receitas simples, ingredientes acessíveis e resultado garantido. Feito pra quem quer ganhar massa sem complicar a vida.",
  price: "R$ 22,80",
  href: "https://domine-a-cozinha.lovable.app",
}

export function Products() {
  return (
    <section id="produtos" className="border-t border-[color:var(--border-subtle)]">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28 lg:px-10">
        <div className="mb-12 grid gap-10 lg:mb-16 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-7">
            <Reveal>
              <span className="pombaz-label">Catálogo</span>
            </Reveal>

            <Reveal delay={80}>
              <h2 className="pombaz-heading mt-6 text-[clamp(2.8rem,5vw,4.4rem)] leading-[0.98] text-[color:var(--text-primary)]">
                Nossos <span className="pombaz-italic-highlight">produtos</span>
              </h2>
            </Reveal>
          </div>

          <div className="flex items-end lg:col-span-5">
            <Reveal delay={160}>
              <p className="max-w-md text-base leading-relaxed text-[color:var(--text-secondary)] md:text-[1.0625rem]">
                Cada produto foi criado pra resolver um problema real. Sem enrolação.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 md:gap-5">
          <Reveal className="h-full" delay={80}>
            <div
              className="pombaz-card group flex h-full flex-col rounded-[8px] border border-[color:var(--border-subtle)] bg-[color:var(--bg-card)] p-7 md:p-9"
              data-cursor="hover"
            >
              <span className="inline-flex w-fit items-center rounded-full border border-[color:var(--border-strong)] px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-[color:var(--text-secondary)]">
                {product.tag}
              </span>

              <h3 className="mt-8 max-w-[14ch] font-[family:var(--font-heading)] text-2xl font-bold leading-tight tracking-[-0.02em] text-[color:var(--text-primary)] md:text-[1.75rem]">
                {product.title}
              </h3>

              <p className="mt-4 text-sm leading-relaxed text-[color:var(--text-secondary)] md:text-[0.95rem]">
                {product.description}
              </p>

              <div className="mt-auto pt-8">
                <div className="flex items-end justify-between gap-6 border-t border-[color:var(--border-subtle)] pt-6">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.22em] text-[color:var(--text-muted)]">
                      A partir de
                    </span>
                    <div className="mt-2 font-[family:var(--font-heading)] text-xl font-medium text-[color:var(--brand-yellow)] md:text-2xl">
                      {product.price}
                    </div>
                  </div>

                  <a
                    href={product.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="pombaz-button group shrink-0"
                  >
                    Acessar
                    <ArrowRight className="h-4 w-4 pombaz-arrow" />
                  </a>
                </div>
              </div>
            </div>
          </Reveal>

          {[0, 1].map((item) => (
            <Reveal key={item} className="h-full" delay={180 + item * 100}>
              <div
                aria-hidden="true"
                className="flex min-h-[320px] h-full flex-col justify-end rounded-[8px] border border-dashed border-[color:var(--border-subtle)] bg-[color:var(--bg-muted)] p-7 md:min-h-[380px] md:p-9"
              >
                <span className="font-[family:var(--font-heading)] text-sm font-medium uppercase tracking-[0.18em] text-[#333333]">
                  Em breve
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
