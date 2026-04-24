import { Reveal } from "./reveal"

function PigeonWatermark() {
  return (
    <svg
      viewBox="0 0 320 320"
      className="h-full w-full"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M92 197C92 143.98 134.98 101 188 101H214C238.301 101 258 120.699 258 145V145C258 169.301 238.301 189 214 189H166"
        stroke="currentColor"
        strokeWidth="18"
        strokeLinecap="round"
      />
      <path
        d="M112 122L73 85"
        stroke="currentColor"
        strokeWidth="18"
        strokeLinecap="round"
      />
      <path
        d="M70 217C98.7188 245.719 145.281 245.719 174 217L188 203"
        stroke="currentColor"
        strokeWidth="18"
        strokeLinecap="round"
      />
      <circle cx="210" cy="136" r="10" fill="currentColor" />
    </svg>
  )
}

export function Quote() {
  return (
    <section className="relative overflow-hidden border-t border-[color:var(--border-subtle)]">
      <div className="absolute inset-0 pombaz-glow-center opacity-70" aria-hidden="true" />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-20 md:py-28 lg:grid-cols-[minmax(0,1.05fr)_minmax(280px,0.95fr)] lg:items-center lg:gap-10 lg:px-10">
        <div className="relative z-10">
          <Reveal>
            <span className="pombaz-label text-[color:var(--label-muted)]">
              Declaração da marca
            </span>
          </Reveal>

          <Reveal delay={90}>
            <blockquote className="mt-6 max-w-3xl font-[family:var(--font-heading)] text-[clamp(22px,3vw,36px)] font-bold leading-[1.14] tracking-[-0.03em] text-[color:var(--text-primary)]">
              “A pomba não pede licença pra aparecer. Ela aparece, prende, converte — e
              vai embora antes de você perceber que já comprou.”
            </blockquote>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-6 font-[family:var(--font-heading)] text-base font-medium uppercase tracking-[0.18em] text-[color:var(--text-primary)]">
              — <span className="pombaz-neon">POMBAZ</span>
            </p>
          </Reveal>
        </div>

        <Reveal delay={120} className="relative h-[320px] min-h-[320px] sm:h-[420px] lg:h-[520px]">
          <div className="absolute inset-0 text-[rgba(255,255,255,0.15)]">
            <PigeonWatermark />
          </div>
          <div className="absolute inset-x-[8%] bottom-0 top-[8%]">
            <img
              src="/pomba-hero.jpg"
              alt="Pomba 3D da POMBAZ"
              className="h-full w-full object-contain object-right opacity-90"
              draggable={false}
            />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
