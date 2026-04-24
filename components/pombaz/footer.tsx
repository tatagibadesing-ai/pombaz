const links = [
  { href: "#produtos", label: "Produtos" },
  { href: "#sobre", label: "A Marca" },
  { href: "#contato", label: "Comece" },
]

export function Footer() {
  return (
    <footer className="border-t border-[#1a1a1a] bg-[#080808]">
      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-0">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <a href="#top" className="flex items-center gap-3" aria-label="POMBAZ — topo">
            <img
              src="/Pombazlogo.webp"
              alt="POMBAZ"
              width={32}
              height={32}
              className="h-8 w-8 rounded-[6px] object-cover"
            />
            <span className="font-[family:var(--font-heading)] text-lg font-bold tracking-[-0.03em] text-[color:var(--text-primary)] md:text-xl">
              POMBAZ
            </span>
          </a>

          <nav aria-label="Rodapé">
            <ul className="flex items-center gap-6 md:gap-8">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm uppercase tracking-[0.14em] text-[#555555] hover:text-[#aaaaaa]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <p className="text-center text-xs tracking-[0.08em] text-[#333333] md:text-right">
            © 2025 POMBAZ — Todos os direitos reservados
          </p>
        </div>
      </div>
    </footer>
  )
}
