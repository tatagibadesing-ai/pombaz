const links = [
  { href: "#produtos", label: "Produtos" },
  { href: "#sobre", label: "A Marca" },
  { href: "#contato", label: "Comece" },
]

export function Footer() {
  return (
    <footer className="border-t border-[#1a1a1a] bg-[#080808]">
      <div className="mx-auto max-w-7xl px-6 py-8 md:py-10 lg:px-0">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row md:gap-8">
          <a href="#top" className="flex items-center gap-3" aria-label="POMBAZ — topo">
            <img
              src="/Pombazlogo.webp"
              alt="POMBAZ"
              width={36}
              height={36}
              className="h-9 w-9 rounded-[6px] object-contain"
            />
            <span className="font-[family:var(--font-heading)] text-lg font-bold tracking-[-0.03em] text-[color:var(--text-primary)] md:text-xl">
              POMBAZ
            </span>
          </a>

          <nav aria-label="Rodapé">
            <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3 md:gap-8">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-xs uppercase tracking-[0.14em] text-[#555555] hover:text-[#aaaaaa] md:text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <p className="max-w-[260px] text-center text-[11px] leading-relaxed tracking-[0.08em] text-[#333333] md:max-w-none md:text-right md:text-xs">
            © 2025 POMBAZ — Todos os direitos reservados
          </p>
        </div>
      </div>
    </footer>
  )
}
