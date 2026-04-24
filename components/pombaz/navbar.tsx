"use client"

import { useEffect, useState } from "react"
import { ArrowRight, Menu, X } from "lucide-react"

const links = [
  { href: "#produtos", label: "Produtos" },
  { href: "#sobre", label: "A Marca" },
  { href: "#contato", label: "Comece" },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[100] transition-all duration-300 ${
        scrolled
          ? "border-b border-[color:var(--border-subtle)] bg-[rgba(10,10,10,0.74)] backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-0">
        <div className="flex h-16 items-center justify-between md:h-20">
          <a href="#top" className="flex items-center gap-3" aria-label="POMBAZ — início">
            <img
              src="/Pombazlogo.webp"
              alt="POMBAZ"
              width={34}
              height={34}
              className="h-[34px] w-[34px] rounded-[6px] object-contain"
            />
            <span className="font-[family:var(--font-heading)] text-xl font-bold tracking-[-0.03em] text-[color:var(--text-primary)] md:text-2xl">
              POMBAZ
            </span>
          </a>

          <nav className="hidden items-center gap-9 md:flex" aria-label="Navegação principal">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-[color:var(--text-secondary)] hover:text-[color:var(--text-primary)]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden lg:block">
              <a href="#produtos" className="pombaz-button pombaz-button-outline group">
                Ver Produtos
                <ArrowRight className="h-3.5 w-3.5 pombaz-arrow" />
              </a>
            </div>

            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-[color:var(--border-subtle)] bg-[rgba(10,10,10,0.55)] text-[color:var(--text-primary)] backdrop-blur md:hidden"
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              aria-expanded={open}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {open && (
          <nav
            className="border-t border-[color:var(--border-subtle)] bg-[rgba(10,10,10,0.9)] py-6 md:hidden"
            aria-label="Navegação mobile"
          >
            <div className="flex flex-col gap-5">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-base text-[color:var(--text-secondary)] hover:text-[color:var(--text-primary)]"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
