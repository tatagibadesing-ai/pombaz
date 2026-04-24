import { Reveal } from "./reveal"

const items = [
  { value: "+35", unit: "dias", label: "de operação" },
  { value: "1", unit: "produto", label: "no catálogo" },
  { value: "R$ 22,80", unit: "", label: "ticket atual" },
  { value: "∞", unit: "", label: "potencial de escala" },
]

export function Stats() {
  return (
    <section
      className="border-y border-[color:var(--border-subtle)]"
      style={{ backgroundColor: "#111009" }}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-10 md:py-14">
        <Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 md:gap-y-0">
            {items.map((item, i) => (
              <div
                key={item.label}
                className={`flex flex-col gap-2 px-4 md:px-6 ${
                  i > 0 ? "md:border-l md:border-[color:var(--border-subtle)]" : ""
                }`}
              >
                <span className="text-[10px] md:text-xs uppercase tracking-[0.22em] text-[color:var(--text-muted)]">
                  {item.label}
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-4xl md:text-5xl lg:text-6xl text-[color:var(--brand-yellow)] leading-none tracking-tight">
                    {item.value}
                  </span>
                  {item.unit && (
                    <span className="font-serif text-lg md:text-xl text-[color:var(--text-secondary)] italic">
                      {item.unit}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
