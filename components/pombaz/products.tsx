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
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-28 lg:px-0">
        <div className="mb-10 grid gap-8 lg:mb-16 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-7">
            <Reveal>
              <span className="pombaz-label">Catálogo</span>
            </Reveal>

            <Reveal delay={80}>
              <h2 className="pombaz-heading mt-4 text-[clamp(2.15rem,10vw,3rem)] leading-[0.98] text-[color:var(--text-primary)] md:mt-6 md:text-[clamp(2.8rem,5vw,4.4rem)]">
                Nossos <span className="pombaz-italic-highlight">protocolos</span>
              </h2>
            </Reveal>
          </div>

          <div className="flex items-end lg:col-span-5">
            <Reveal delay={160}>
              <p className="max-w-md text-sm leading-relaxed text-[color:var(--text-secondary)] md:text-[1.0625rem]">
                Cada produto foi criado pra resolver um problema real. Sem enrolação.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 md:gap-5">
          <Reveal className="h-full" delay={80}>
            <div
              className="pombaz-card group relative flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-[#1b1b1b] bg-[#050505] p-1.5 shadow-2xl shadow-black/50 hover:border-[rgba(240,192,0,0.32)]"
              data-cursor="hover"
            >
              <div className="relative flex h-full flex-col overflow-hidden rounded-[1.15rem] border border-[#202020] bg-[linear-gradient(135deg,#101010_0%,#080808_42%,#0f0f0f_100%)] p-6 md:p-9">
                <div
                  className="pointer-events-none absolute inset-0 opacity-[0.28]"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle, rgba(255,255,255,0.12) 0.8px, transparent 0.8px)",
                    backgroundSize: "10px 10px",
                  }}
                  aria-hidden="true"
                />
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_46%,rgba(0,0,0,0.45)_82%,rgba(0,0,0,0.72)_100%)]" aria-hidden="true" />
                <div className="pointer-events-none absolute left-1/2 top-0 h-px w-1/2 -translate-x-1/2 bg-gradient-to-r from-transparent via-[rgba(240,192,0,0.8)] to-transparent shadow-[0_0_16px_rgba(240,192,0,0.55)]" aria-hidden="true" />
                <div className="pointer-events-none absolute -right-16 top-0 h-44 w-44 rounded-full bg-[rgba(240,192,0,0.06)] blur-[70px]" aria-hidden="true" />

                <div className="relative z-10 flex h-full flex-col">
                  <span className="inline-flex w-fit items-center rounded-full border border-[color:var(--border-strong)] bg-black/35 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-[color:var(--text-secondary)]">
                    {product.tag}
                  </span>

                  <h3 className="mt-7 max-w-[15ch] font-[family:var(--font-heading)] text-[1.35rem] font-bold leading-tight tracking-[-0.02em] text-[color:var(--text-primary)] md:text-[1.75rem]">
                    {product.title}
                  </h3>

                  <p className="mt-4 text-sm leading-relaxed text-[color:var(--text-secondary)] md:text-[0.95rem]">
                    {product.description}
                  </p>

                  <div className="mt-auto pt-7">
                    <div className="flex flex-col gap-5 border-t border-white/10 pt-5 min-[390px]:flex-row min-[390px]:items-end min-[390px]:justify-between md:gap-6 md:pt-6">
                      <div className="min-w-0">
                        <span className="text-[10px] uppercase tracking-[0.22em] text-[color:var(--text-muted)]">
                          A partir de
                        </span>
                        <div className="mt-2 whitespace-nowrap font-[family:var(--font-heading)] text-xl font-medium text-[color:var(--brand-yellow)] md:text-2xl">
                          {product.price}
                        </div>
                      </div>

                      <a
                        href={product.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="pombaz-button group w-full shrink-0 min-[390px]:w-auto"
                      >
                        Acessar
                        <ArrowRight className="h-4 w-4 pombaz-arrow" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {[0, 1].map((item) => (
            <Reveal key={item} className="h-full" delay={180 + item * 100}>
              <div
                aria-hidden="true"
                className="relative flex min-h-[320px] h-full flex-col justify-end overflow-hidden rounded-[1.5rem] border border-dashed border-[#202020] bg-[#050505] p-1.5 opacity-80 md:min-h-[380px]"
              >
                <div className="relative flex h-full flex-col justify-end overflow-hidden rounded-[1.15rem] border border-dashed border-[#171717] bg-[linear-gradient(135deg,#0d0d0d_0%,#080808_55%,#0d0d0d_100%)] p-7 md:p-9">
                  <div
                    className="pointer-events-none absolute inset-0 opacity-[0.16]"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle, rgba(255,255,255,0.1) 0.8px, transparent 0.8px)",
                      backgroundSize: "10px 10px",
                    }}
                    aria-hidden="true"
                  />
                  <span className="relative z-10 font-[family:var(--font-heading)] text-sm font-medium uppercase tracking-[0.18em] text-[#333333]">
                    Em breve
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
