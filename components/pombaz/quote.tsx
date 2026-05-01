import { Reveal } from "./reveal"

function ConversionPanel() {
  return (
    <div className="relative h-full min-h-[310px] overflow-hidden rounded-[1.5rem] border border-[#1e1e1e] bg-[#050505] p-1.5 shadow-2xl shadow-black/50 md:min-h-[360px]">
      <div className="relative h-full overflow-hidden rounded-[1.15rem] border border-[#202020] bg-[linear-gradient(135deg,#141414_0%,#080808_48%,#101010_100%)] p-5 md:p-7">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.22]"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.11) 0.8px, transparent 0.8px)",
            backgroundSize: "10px 10px",
          }}
          aria-hidden="true"
        />
        <div className="pointer-events-none absolute left-1/2 top-0 h-px w-1/2 -translate-x-1/2 bg-gradient-to-r from-transparent via-[rgba(240,192,0,0.7)] to-transparent" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(240,192,0,0.08),transparent_46%)]" />

        <div className="relative z-10 flex h-full flex-col justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-[0.22em] text-[color:var(--text-muted)]">
              Fluxo da atenção
            </span>
            <h3 className="mt-3 font-[family:var(--font-heading)] text-xl font-bold text-white md:text-2xl">
              Protocolo → Aplicação → Resultado
            </h3>
          </div>

          <div className="my-6 space-y-3 md:my-10 md:space-y-4">
            {[
              { label: "Protocolo", value: "Entrada", width: "100%" },
              { label: "Aplicação", value: "Retenção", width: "72%" },
              { label: "Resultado", value: "Venda", width: "48%" },
            ].map((item) => (
              <div key={item.label} className="rounded-2xl border border-white/5 bg-black/45 p-3.5 md:p-4">
                <div className="mb-2.5 flex items-center justify-between md:mb-3">
                  <span className="text-sm font-medium text-white">{item.label}</span>
                  <span className="text-[10px] uppercase tracking-[0.16em] text-[color:var(--text-muted)]">
                    {item.value}
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-white/5">
                  <div
                    className="h-full rounded-full bg-[color:var(--brand-yellow)]"
                    style={{ width: item.width }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-1.5">
            {["IA", "Shorts", "Produto"].map((item) => (
              <div key={item} className="rounded-xl border border-white/5 bg-white/[0.03] px-2 py-3 text-center md:py-3.5">
                <span className="font-[family:var(--font-heading)] text-xs font-bold text-white md:text-sm">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function Quote() {
  return (
    <section className="relative overflow-hidden border-t border-[color:var(--border-subtle)]">
      <div className="relative mx-auto grid max-w-7xl gap-8 px-6 py-16 md:py-28 lg:grid-cols-[minmax(0,1.08fr)_minmax(360px,0.92fr)] lg:items-center lg:gap-10 lg:px-0">
        <div className="relative z-10">
          <Reveal>
            <span className="pombaz-label text-[color:var(--label-muted)]">
              Declaração da marca
            </span>
          </Reveal>

          <Reveal delay={90}>
            <blockquote className="mt-4 max-w-2xl font-[family:var(--font-heading)] text-[clamp(24px,8vw,32px)] font-bold leading-[1.04] tracking-[-0.03em] text-[color:var(--text-primary)] md:mt-6 md:text-[clamp(28px,4vw,48px)]">
              “A pomba não promete. A pomba entrega.”
            </blockquote>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-5 font-[family:var(--font-heading)] text-sm font-bold uppercase tracking-[0.18em] text-[color:var(--text-primary)] md:mt-7 md:text-base">
              — <span className="pombaz-neon">POMBAZ</span>
            </p>
          </Reveal>
        </div>

        <Reveal delay={120} className="h-full">
          <ConversionPanel />
        </Reveal>
      </div>
    </section>
  )
}
