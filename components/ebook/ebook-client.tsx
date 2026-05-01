"use client"

import { useEffect, useMemo, useState, type CSSProperties, type FormEvent, type ReactNode } from "react"
import { ArrowRight, LogOut } from "lucide-react"
import Link from "next/link"
import type { EbookCategory, EbookProduct, EbookRecipe } from "@/lib/ebook/types"

export function EbookClient({ slug }: { slug?: string }) {
  const [authenticatedEmail, setAuthenticatedEmail] = useState<string | null>(null)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("6767")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [checkingSession, setCheckingSession] = useState(true)
  const [products, setProducts] = useState<EbookProduct[]>([])
  const [selectedProduct, setSelectedProduct] = useState<EbookProduct | null>(null)
  const [categories, setCategories] = useState<EbookCategory[]>([])
  const [recipes, setRecipes] = useState<EbookRecipe[]>([])

  useEffect(() => {
    fetch("/api/ebook/session")
      .then((response) => response.json())
      .then((data) => {
        if (data.authenticated && data.email) {
          setAuthenticatedEmail(data.email)
        }
      })
      .catch(() => setMessage("Erro ao verificar acesso."))
      .finally(() => {
        setCheckingSession(false)
      })
  }, [])

  useEffect(() => {
    if (authenticatedEmail) {
      setLoading(true)
      loadEbook(slug).finally(() => setLoading(false))
    }
  }, [slug, authenticatedEmail])

  const groupedRecipes = useMemo(() => {
    return categories
      .map((category) => ({
        category,
        recipes: recipes.filter((recipe) => recipe.category_id === category.id),
      }))
      .filter((group) => group.recipes.length > 0)
  }, [categories, recipes])

  async function loadEbook(productSlug?: string) {
    const params = productSlug ? `?slug=${encodeURIComponent(productSlug)}` : ""
    const response = await fetch(`/api/ebook/data${params}`)
    const data = await response.json()

    if (!response.ok) {
      setMessage(data.error ?? "Erro ao carregar ebook.")
      return
    }

    setProducts(data.products ?? [])
    setSelectedProduct(data.selectedProduct ?? null)
    setCategories(data.categories ?? [])
    setRecipes(data.recipes ?? [])
    setMessage("")
  }

  async function handleAuth(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setMessage("")

    try {
      const response = await fetch("/api/ebook/session", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
      const data = await response.json()

      if (!response.ok) throw new Error(data.error ?? "Erro ao entrar.")

      setAuthenticatedEmail(data.email)
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Erro ao entrar.")
    } finally {
      setLoading(false)
    }
  }

  async function signOut() {
    await fetch("/api/ebook/session", { method: "DELETE" })
    setAuthenticatedEmail(null)
    setProducts([])
    setSelectedProduct(null)
    setCategories([])
    setRecipes([])
  }

  if (checkingSession) {
    return <LoadingScreen />
  }

  return (
    <main
      className="min-h-screen bg-black text-white"
      style={
        selectedProduct
          ? ({
              "--brand-yellow": selectedProduct.accent_color,
              "--brand-yellow-rgb": selectedProduct.accent_rgb,
            } as CSSProperties)
          : undefined
      }
    >
      {!authenticatedEmail ? (
        <LoginScreen
          email={email}
          loading={loading}
          message={message}
          password={password}
          setEmail={setEmail}
          setPassword={setPassword}
          onSubmit={handleAuth}
        />
      ) : (
        <ReaderScreen
          email={authenticatedEmail}
          groupedRecipes={groupedRecipes}
          loading={loading}
          products={products}
          selectedProduct={selectedProduct}
          signOut={signOut}
        />
      )}
    </main>
  )
}

function LoadingScreen() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-6 text-white">
      <div className="text-center">
        <img src="/Pombazlogo.webp" alt="POMBAZ" className="mx-auto h-10 w-10 object-contain" />
        <p className="mt-5 font-[family:var(--font-heading)] text-xs font-bold uppercase tracking-[0.22em] text-[color:var(--text-secondary)]">
          Carregando acesso
        </p>
      </div>
    </main>
  )
}

function LoginScreen({
  email,
  loading,
  message,
  password,
  setEmail,
  setPassword,
  onSubmit,
}: {
  email: string
  loading: boolean
  message: string
  password: string
  setEmail: (value: string) => void
  setPassword: (value: string) => void
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
}) {
  return (
    <section className="flex min-h-screen items-center justify-center px-6">
      <form onSubmit={onSubmit} className="w-full max-w-sm text-center">
        <a href="/" className="mb-12 inline-flex items-center justify-center gap-3" aria-label="POMBAZ">
          <img src="/Pombazlogo.webp" alt="POMBAZ" className="h-10 w-10 object-contain" />
          <span className="font-[family:var(--font-heading)] text-2xl font-bold tracking-[-0.03em]">
            POMBAZ
          </span>
        </a>

        <label className="sr-only" htmlFor="ebook-email">
          Email
        </label>
        <input
          id="ebook-email"
          required
          type="email"
          value={email}
          placeholder="Email liberado"
          onChange={(event) => setEmail(event.target.value)}
          className="h-14 w-full border-0 border-b border-[#222] bg-transparent text-center font-[family:var(--font-heading)] text-base font-bold tracking-[0.04em] text-white outline-none placeholder:text-[#333] focus:border-[color:var(--brand-yellow)]"
        />

        <label className="sr-only" htmlFor="ebook-password">
          Senha
        </label>
        <input
          id="ebook-password"
          required
          minLength={4}
          type="password"
          value={password}
          placeholder="Senha"
          onChange={(event) => setPassword(event.target.value)}
          className="mt-5 h-14 w-full border-0 border-b border-[#222] bg-transparent text-center font-[family:var(--font-heading)] text-base font-bold tracking-[0.16em] text-white outline-none placeholder:text-[#333] focus:border-[color:var(--brand-yellow)]"
        />

        {message && <p className="mt-5 text-sm text-[color:var(--brand-yellow)]">{message}</p>}

        <button type="submit" disabled={loading} className="pombaz-button group mt-8 w-full">
          {loading ? "Aguarde..." : "Entrar"}
          <ArrowRight className="h-4 w-4 pombaz-arrow" />
        </button>
      </form>
    </section>
  )
}

function ReaderScreen({
  email,
  groupedRecipes,
  loading,
  products,
  selectedProduct,
  signOut,
}: {
  email: string
  groupedRecipes: Array<{ category: EbookCategory; recipes: EbookRecipe[] }>
  loading: boolean
  products: EbookProduct[]
  selectedProduct: EbookProduct | null
  signOut: () => void
}) {
  return (
    <section className="min-h-screen bg-black">
      <header className="sticky top-0 z-50 border-b border-[#161616] bg-black/88 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 md:px-0">
          <a href="/" className="flex items-center gap-3" aria-label="POMBAZ">
            <img src="/Pombazlogo.webp" alt="POMBAZ" className="h-9 w-9 object-contain" />
            <span className="font-[family:var(--font-heading)] text-2xl font-bold tracking-[-0.03em]">
              POMBAZ
            </span>
          </a>

          <button type="button" onClick={signOut} className="pombaz-button pombaz-button-outline group">
            Sair
            <LogOut className="h-3.5 w-3.5" />
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-6 md:px-0 md:py-8">
        <div className="mb-7 border-b border-[#161616] pb-6 md:mb-9 md:pb-8">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <span className="pombaz-label">-- EBOOK LIBERADO</span>
              <h1 className="pombaz-heading mt-3 max-w-[14ch] text-[clamp(30px,6vw,54px)] leading-[0.92] tracking-[-0.04em]">
                {selectedProduct?.title ?? "Seu ebook"}
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[color:var(--text-secondary)] md:text-base">
                {selectedProduct?.description ??
                  "Receitas organizadas por categoria, com imagem, ingredientes, preparo e informacao nutricional."}
              </p>
              <p className="mt-3 text-[10px] uppercase tracking-[0.18em] text-[color:var(--text-muted)]">
                Acesso: {email}
              </p>
            </div>

            {products.length > 1 && (
              <nav className="grid gap-2 rounded-2xl border border-[#1b1b1b] bg-[#070707] p-2 md:min-w-[360px]">
                {products.map((product) => {
                  // Map database slugs to user requested slugs for the URL
                  const displaySlug = product.slug === "receitas-massa" ? "ganhar-massa" : product.slug;
                  const isActive = selectedProduct?.id === product.id;
                  
                  return (
                    <Link
                      key={product.id}
                      href={`/e-book/${displaySlug}`}
                      className={`rounded-xl px-4 py-3 text-left font-[family:var(--font-heading)] text-xs font-bold uppercase tracking-[0.12em] transition ${
                        isActive
                          ? "bg-[color:var(--brand-yellow)] text-black"
                          : "text-[color:var(--text-secondary)] hover:bg-[#111] hover:text-white"
                      }`}
                    >
                      {product.title}
                    </Link>
                  );
                })}
              </nav>
            )}
          </div>
        </div>

        {loading ? (
          <p className="text-[color:var(--text-secondary)]">Carregando ebook...</p>
        ) : groupedRecipes.length > 0 ? (
          <div className="space-y-14">
            {groupedRecipes.map(({ category, recipes: categoryRecipes }, pageIndex) => (
              <section
                key={category.id}
                className="overflow-hidden rounded-[1.75rem] border border-[#191919] bg-[#050505]"
              >
                <div className="grid border-b border-[#191919] md:grid-cols-[220px_1fr]">
                  <div className="border-b border-[#191919] p-6 md:border-b-0 md:border-r md:p-8">
                    <span className="text-[10px] uppercase tracking-[0.24em] text-[color:var(--text-muted)]">
                      Pagina {String(pageIndex + 1).padStart(2, "0")}
                    </span>
                    <div className="mt-5 h-px w-12 bg-[color:var(--brand-yellow)]" />
                  </div>
                  <div className="p-6 md:p-8">
                    <h2 className="font-[family:var(--font-heading)] text-3xl font-bold leading-none tracking-[-0.03em] text-white md:text-5xl">
                      {category.title}
                    </h2>
                    {category.description && (
                      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[color:var(--text-secondary)]">
                        {category.description}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid gap-px bg-[#191919] md:grid-cols-2">
                  {categoryRecipes.map((recipe) => (
                    <RecipeCard key={recipe.id} recipe={recipe} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        ) : (
          <p className="text-[color:var(--text-secondary)]">Ainda nao tem receitas publicadas.</p>
        )}
      </div>
    </section>
  )
}

function RecipeCard({ recipe }: { recipe: EbookRecipe }) {
  const nutritionEntries = Object.entries(recipe.nutrition ?? {})

  return (
    <article className="bg-[#070707] p-5 md:p-6">
      {recipe.image_url ? (
        <img src={recipe.image_url} alt={recipe.title} className="h-72 w-full rounded-2xl object-cover md:h-80 lg:h-[360px]" />
      ) : (
        <div className="flex h-72 items-center justify-center rounded-2xl border border-[#191919] bg-[#050505] text-xs uppercase tracking-[0.18em] text-[color:var(--text-muted)] md:h-80 lg:h-[360px]">
          Imagem pendente
        </div>
      )}
      <div className="pt-6">
        <h3 className="max-w-xl font-[family:var(--font-heading)] text-2xl font-bold leading-tight tracking-[-0.02em] text-white">
          {recipe.title}
        </h3>
        {recipe.subtitle && (
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-[color:var(--text-secondary)]">
            {recipe.subtitle}
          </p>
        )}

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <div>
            <SectionTitle>Ingredientes</SectionTitle>
            <ul className="mt-3 space-y-2 text-sm text-[color:var(--text-primary)]">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={`${ingredient}-${index}`} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--brand-yellow)]" />
                  <span>{ingredient}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <SectionTitle>Modo de preparo</SectionTitle>
            <ol className="mt-3 space-y-3 text-sm leading-relaxed text-[color:var(--text-secondary)]">
              {recipe.preparation_steps.map((step, index) => (
                <li key={`${step}-${index}`} className="flex gap-3">
                  <span className="font-[family:var(--font-heading)] text-xs font-bold text-[color:var(--brand-yellow)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {nutritionEntries.length > 0 && (
          <div className="mt-7 border-t border-[#191919] pt-5">
            <div className="flex items-center justify-between gap-4">
              <SectionTitle>Informacao nutricional</SectionTitle>
              <span className="text-[10px] uppercase tracking-[0.18em] text-[color:var(--text-muted)]">
                por receita
              </span>
            </div>
            <ul className="mt-4 grid gap-px overflow-hidden rounded-2xl border border-[#1d1d1d] bg-[#1d1d1d] sm:grid-cols-2 lg:grid-cols-4">
              {nutritionEntries.map(([key, value]) => (
                <li key={key} className="bg-[#050505] px-4 py-4">
                  <span className="block font-[family:var(--font-heading)] text-[10px] font-medium uppercase tracking-[0.18em] text-[color:var(--text-muted)]">
                    {key}
                  </span>
                  <strong className="mt-2 block font-[family:var(--font-heading)] text-base font-bold leading-none text-white">
                    {String(value)}
                  </strong>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </article>
  )
}

function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <h4 className="font-[family:var(--font-heading)] text-[11px] font-bold uppercase tracking-[0.18em] text-[color:var(--brand-yellow)]">
      {children}
    </h4>
  )
}
