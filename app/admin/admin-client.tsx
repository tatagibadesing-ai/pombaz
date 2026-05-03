"use client"

import { useEffect, useMemo, useState, type CSSProperties, type Dispatch, type FormEvent, type ReactNode, type SetStateAction } from "react"
import { ArrowRight, BrainCircuit, Edit3, Lock, LogOut, Plus, Trash2, UploadCloud, X } from "lucide-react"
import { linesToArray, slugify } from "@/lib/ebook/slug"
import type { EbookAccess, EbookCategory, EbookProduct, EbookRecipe, GeminiRecipeDraft } from "@/lib/ebook/types"

type Tab = "recipes" | "ai" | "access"

const emptyRecipe = {
  categoryId: "",
  title: "",
  subtitle: "",
  imageUrl: "",
  ingredients: "",
  preparation: "",
  nutrition: '{\n  "calorias": "",\n  "proteinas": "",\n  "carboidratos": "",\n  "gorduras": ""\n}',
  notes: "",
  sortOrder: 0,
}

type RecipeFormState = typeof emptyRecipe

export function AdminClient() {
  const [authenticated, setAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(true)
  const [checkingSession, setCheckingSession] = useState(true)
  const [tab, setTab] = useState<Tab>("recipes")
  const [products, setProducts] = useState<EbookProduct[]>([])
  const [selectedProductId, setSelectedProductId] = useState("")
  const [categories, setCategories] = useState<EbookCategory[]>([])
  const [recipes, setRecipes] = useState<EbookRecipe[]>([])
  const [accessList, setAccessList] = useState<EbookAccess[]>([])
  const [categoryTitle, setCategoryTitle] = useState("")
  const [categoryDescription, setCategoryDescription] = useState("")
  const [accessEmail, setAccessEmail] = useState("")
  const [rawText, setRawText] = useState("")
  const [drafts, setDrafts] = useState<GeminiRecipeDraft[]>([])
  const [draftImages, setDraftImages] = useState<Record<number, string>>({})
  const [recipeForm, setRecipeForm] = useState(emptyRecipe)
  const [editingRecipe, setEditingRecipe] = useState<EbookRecipe | null>(null)
  const [editForm, setEditForm] = useState<RecipeFormState>(emptyRecipe)

  useEffect(() => {
    fetch("/api/admin/session")
      .then((response) => response.json())
      .then((data) => {
        setAuthenticated(Boolean(data.authenticated))
        if (data.authenticated) loadAdminData()
      })
      .finally(() => {
        setLoading(false)
        setCheckingSession(false)
      })
  }, [])

  const selectedProduct = useMemo(
    () => products.find((product) => product.id === selectedProductId) ?? products[0] ?? null,
    [products, selectedProductId],
  )

  const filteredCategories = useMemo(
    () => categories.filter((category) => category.product_id === selectedProduct?.id),
    [categories, selectedProduct?.id],
  )

  const filteredRecipes = useMemo(() => {
    const categoryIds = new Set(filteredCategories.map((category) => category.id))
    return recipes.filter((recipe) => categoryIds.has(recipe.category_id))
  }, [filteredCategories, recipes])

  const filteredAccessList = useMemo(
    () => accessList.filter((access) => access.product_id === selectedProduct?.id),
    [accessList, selectedProduct?.id],
  )

  useEffect(() => {
    if (!recipeForm.categoryId && filteredCategories[0]?.id) {
      setRecipeForm((current) => ({ ...current, categoryId: filteredCategories[0].id }))
    }
    if (recipeForm.categoryId && !filteredCategories.some((category) => category.id === recipeForm.categoryId)) {
      setRecipeForm((current) => ({ ...current, categoryId: filteredCategories[0]?.id ?? "" }))
    }
  }, [selectedProductId, categories, recipeForm.categoryId, filteredCategories])

  const recipeCountByCategory = useMemo(() => {
    return filteredRecipes.reduce<Record<string, number>>((acc, recipe) => {
      acc[recipe.category_id] = (acc[recipe.category_id] ?? 0) + 1
      return acc
    }, {})
  }, [filteredRecipes])

  async function api<T>(url: string, init?: RequestInit): Promise<T> {
    const response = await fetch(url, {
      ...init,
      headers: {
        "content-type": "application/json",
        ...(init?.headers ?? {}),
      },
    })
    const data = await response.json()
    if (!response.ok) throw new Error(data.error ?? "Erro inesperado.")
    return data
  }

  async function signIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setMessage("")

    try {
      await api("/api/admin/session", {
        method: "POST",
        body: JSON.stringify({ password }),
      })
      setAuthenticated(true)
      await loadAdminData()
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Senha incorreta.")
    } finally {
      setLoading(false)
    }
  }

  async function signOut() {
    await fetch("/api/admin/session", { method: "DELETE" })
    setAuthenticated(false)
    setPassword("")
  }

  async function loadAdminData() {
    try {
      const data = await api<{
        products: EbookProduct[]
        categories: EbookCategory[]
        recipes: EbookRecipe[]
        accessList: EbookAccess[]
      }>("/api/admin/data")

      setProducts(data.products ?? [])
      setCategories(data.categories ?? [])
      setRecipes(data.recipes ?? [])
      setAccessList(data.accessList ?? [])
      setSelectedProductId((current) => current || data.products?.[0]?.id || "")
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Erro ao carregar painel.")
    }
  }

  async function createCategory(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!categoryTitle.trim() || !selectedProduct) return

    try {
      await api("/api/admin/categories", {
        method: "POST",
        body: JSON.stringify({
          title: categoryTitle,
          productId: selectedProduct.id,
          description: categoryDescription,
          sortOrder: filteredCategories.length * 10 + 10,
        }),
      })
      setMessage("Categoria criada.")
      setCategoryTitle("")
      setCategoryDescription("")
      await loadAdminData()
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Erro ao criar categoria.")
    }
  }

  async function grantAccess(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!accessEmail.trim() || !selectedProduct) return

    try {
      await api("/api/admin/access", {
        method: "POST",
        body: JSON.stringify({ email: accessEmail, productId: selectedProduct.id }),
      })
      setMessage("Acesso liberado.")
      setAccessEmail("")
      await loadAdminData()
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Erro ao liberar acesso.")
    }
  }

  async function revokeAccess(id: string) {
    try {
      await api("/api/admin/access", {
        method: "PATCH",
        body: JSON.stringify({ id, hasAccess: false }),
      })
      setMessage("Acesso removido.")
      await loadAdminData()
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Erro ao remover acesso.")
    }
  }

  async function createRecipe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    await saveRecipe({
      categoryId: recipeForm.categoryId,
      title: recipeForm.title,
      subtitle: recipeForm.subtitle,
      imageUrl: recipeForm.imageUrl,
      ingredients: linesToArray(recipeForm.ingredients),
      preparationSteps: linesToArray(recipeForm.preparation),
      nutrition: safeParseNutrition(recipeForm.nutrition),
      notes: recipeForm.notes,
      sortOrder: recipeForm.sortOrder,
    })
    setRecipeForm((current) => ({
      ...emptyRecipe,
      categoryId: current.categoryId,
      nutrition: emptyRecipe.nutrition,
    }))
  }

  async function saveRecipe(payload: {
    categoryId: string
    title: string
    subtitle?: string
    imageUrl?: string
    ingredients: string[]
    preparationSteps: string[]
    nutrition: Record<string, string | number>
    notes?: string
    sortOrder?: number
  }) {
    if (!payload.categoryId || !payload.title.trim()) return

    try {
      await api("/api/admin/recipes", {
        method: "POST",
        body: JSON.stringify(payload),
      })
      setMessage("Receita publicada.")
      await loadAdminData()
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Erro ao publicar receita.")
    }
  }

  async function deleteRecipe(id: string) {
    try {
      await api("/api/admin/recipes", {
        method: "DELETE",
        body: JSON.stringify({ id }),
      })
      setMessage("Receita apagada.")
      await loadAdminData()
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Erro ao apagar receita.")
    }
  }

  async function uploadImage(file: File) {
    const formData = new FormData()
    formData.append("file", file)

    const response = await fetch("/api/admin/upload-image", {
      method: "POST",
      body: formData,
    })
    const data = await response.json()

    if (!response.ok) throw new Error(data.error ?? "Erro ao enviar imagem.")

    return data.url as string
  }

  function openEditRecipe(recipe: EbookRecipe) {
    setEditingRecipe(recipe)
    setEditForm({
      categoryId: recipe.category_id,
      title: recipe.title,
      subtitle: recipe.subtitle ?? "",
      imageUrl: recipe.image_url ?? "",
      ingredients: recipe.ingredients.join("\n"),
      preparation: recipe.preparation_steps.join("\n"),
      nutrition: JSON.stringify(recipe.nutrition ?? {}, null, 2),
      notes: recipe.notes ?? "",
      sortOrder: recipe.sort_order,
    })
  }

  async function updateRecipe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!editingRecipe) return

    try {
      await api("/api/admin/recipes", {
        method: "PATCH",
        body: JSON.stringify({
          id: editingRecipe.id,
          categoryId: editForm.categoryId,
          title: editForm.title,
          subtitle: editForm.subtitle,
          imageUrl: editForm.imageUrl,
          ingredients: linesToArray(editForm.ingredients),
          preparationSteps: linesToArray(editForm.preparation),
          nutrition: safeParseNutrition(editForm.nutrition),
          notes: editForm.notes,
          sortOrder: editForm.sortOrder,
          isPublished: editingRecipe.is_published,
        }),
      })
      setMessage("Receita atualizada.")
      setEditingRecipe(null)
      await loadAdminData()
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Erro ao atualizar receita.")
    }
  }

  async function generateDrafts() {
    setLoading(true)
    setMessage("")

    try {
      const data = await api<{ drafts: GeminiRecipeDraft[] }>("/api/admin/gemini-recipes", {
        method: "POST",
        body: JSON.stringify({ rawText, productTitle: selectedProduct?.title }),
      })
      setDrafts(data.drafts ?? [])
      setMessage(`${data.drafts?.length ?? 0} rascunhos gerados pela IA.`)
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Erro ao gerar receitas.")
    } finally {
      setLoading(false)
    }
  }

  async function saveDraft(draft: GeminiRecipeDraft, index: number) {
    const categoryId = await ensureCategory(draft.category_title)
    if (!categoryId) return

    await saveRecipe({
      categoryId,
      title: draft.title,
      subtitle: draft.subtitle,
      imageUrl: draftImages[index],
      ingredients: draft.ingredients,
      preparationSteps: draft.preparation_steps,
      nutrition: draft.nutrition,
      notes: draft.notes,
      sortOrder: filteredRecipes.length * 10 + index + 10,
    })
  }

  async function ensureCategory(title: string) {
    const normalizedSlug = slugify(title || "Receitas")
    const existing = filteredCategories.find((category) => category.slug.startsWith(normalizedSlug))
    if (existing) return existing.id

    try {
      const data = await api<{ category: EbookCategory }>("/api/admin/categories", {
        method: "POST",
        body: JSON.stringify({
          title: title || "Receitas",
          productId: selectedProduct?.id,
          sortOrder: filteredCategories.length * 10 + 10,
        }),
      })
      await loadAdminData()
      return data.category.id
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Erro ao criar categoria.")
      return null
    }
  }

  if (checkingSession) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black px-6 text-white">
        <div className="text-center">
          <img src="/Pombazlogo.webp" alt="POMBAZ" className="mx-auto h-10 w-10 object-contain" />
          <p className="mt-5 font-[family:var(--font-heading)] text-xs font-bold uppercase tracking-[0.22em] text-[color:var(--text-secondary)]">
            Carregando painel
          </p>
        </div>
      </main>
    )
  }

  if (!authenticated) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black px-6 text-white">
        <form onSubmit={signIn} className="w-full max-w-sm text-center">
          <a href="/" className="mb-10 inline-flex items-center justify-center gap-3" aria-label="POMBAZ">
            <img src="/Pombazlogo.webp" alt="POMBAZ" className="h-10 w-10 object-contain" />
            <span className="font-[family:var(--font-heading)] text-2xl font-bold tracking-[-0.03em]">
              POMBAZ
            </span>
          </a>

          <label className="sr-only" htmlFor="admin-password">
            Senha do admin
          </label>
          <input
            id="admin-password"
            autoFocus
            required
            minLength={4}
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Senha do admin"
            className="h-14 w-full border-0 border-b border-[#222] bg-transparent text-center font-[family:var(--font-heading)] text-lg font-bold tracking-[0.12em] text-white outline-none placeholder:text-[#333] focus:border-[color:var(--brand-yellow)]"
          />

          {message && <p className="mt-5 text-sm text-[color:var(--brand-yellow)]">{message}</p>}

          <button type="submit" className="pombaz-button group mt-7 w-full" disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
            <ArrowRight className="h-4 w-4 pombaz-arrow" />
          </button>
        </form>
      </main>
    )
  }

  return (
    <AdminShell onSignOut={signOut}>
      <div
        className={`mx-auto max-w-7xl px-6 py-10 md:px-0 ${selectedProduct?.accent_color === "#399cff" ? "pombaz-blue-theme" : ""}`}
        style={
          selectedProduct
            ? ({
                "--brand-yellow": selectedProduct.accent_color,
                "--brand-yellow-rgb": selectedProduct.accent_rgb,
              } as CSSProperties)
            : undefined
        }
      >
        <div className="flex flex-col justify-between gap-6 border-b border-[#1e1e1e] pb-8 lg:flex-row lg:items-end">
          <div>
            <span className="pombaz-label">— PAINEL ADMIN</span>
            <h1 className="pombaz-heading mt-4 text-[clamp(42px,7vw,84px)] leading-[0.92]">
              Receita <span className="pombaz-italic-highlight">Mágica.</span>
            </h1>
            <p className="mt-4 max-w-2xl text-[color:var(--text-secondary)]">
              Escolha o produto, organize as receitas, libere o acesso certo e deixe a IA montar rascunhos por página.
            </p>
          </div>

          <div className="w-full max-w-xl space-y-3">
            <div className="grid gap-2 rounded-2xl border border-[#1e1e1e] bg-[#080808] p-2 sm:grid-cols-2">
              {products.map((product) => (
                <button
                  key={product.id}
                  type="button"
                  onClick={() => setSelectedProductId(product.id)}
                  className={`rounded-xl px-4 py-3 text-left font-[family:var(--font-heading)] text-xs font-bold uppercase tracking-[0.12em] transition ${
                    selectedProduct?.id === product.id
                      ? "bg-[color:var(--brand-yellow)] text-black"
                      : "text-[color:var(--text-secondary)] hover:bg-[#111] hover:text-white"
                  }`}
                >
                  {product.title}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-2 rounded-2xl border border-[#1e1e1e] bg-[#080808] p-2">
              {(["recipes", "ai", "access"] as Tab[]).map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setTab(item)}
                  className={`rounded-xl px-4 py-3 font-[family:var(--font-heading)] text-xs font-bold uppercase tracking-[0.12em] transition ${
                    tab === item
                      ? "bg-[color:var(--brand-yellow)] text-black"
                      : "text-[color:var(--text-secondary)] hover:bg-[#111] hover:text-white"
                  }`}
                >
                  {item === "recipes" ? "Ebook" : item === "ai" ? "IA" : "Acessos"}
                </button>
              ))}
            </div>
          </div>
        </div>

        {message && (
          <div className="mt-6 rounded-xl border border-[rgba(var(--brand-yellow-rgb),0.3)] bg-[rgba(var(--brand-yellow-rgb),0.08)] px-4 py-3 text-sm text-[color:var(--brand-yellow)]">
            {message}
          </div>
        )}

        {tab === "recipes" && (
          <div className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <Panel title="Categorias" icon={<Plus className="h-5 w-5" />}>
              <form onSubmit={createCategory} className="space-y-4">
                <Field label="Nome da categoria" value={categoryTitle} onChange={setCategoryTitle} />
                <Area label="Descrição" value={categoryDescription} onChange={setCategoryDescription} />
                <button type="submit" className="pombaz-button group w-full">
                  Criar categoria
                  <ArrowRight className="h-4 w-4 pombaz-arrow" />
                </button>
              </form>

              <div className="mt-6 space-y-3">
                {filteredCategories.map((category) => (
                  <div key={category.id} className="rounded-xl border border-[#222] bg-black p-4">
                    <div className="flex items-center justify-between gap-3">
                      <strong>{category.title}</strong>
                      <span className="text-xs text-[color:var(--text-secondary)]">
                        {recipeCountByCategory[category.id] ?? 0} receitas
                      </span>
                    </div>
                    {category.description && (
                      <p className="mt-2 text-sm text-[color:var(--text-secondary)]">
                        {category.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </Panel>

            <Panel title="Nova receita" icon={<UploadCloud className="h-5 w-5" />}>
              <RecipeForm
                categories={filteredCategories}
                form={recipeForm}
                setForm={setRecipeForm}
                onSubmit={createRecipe}
                uploadImage={uploadImage}
              />
            </Panel>

            <Panel title="Receitas publicadas" icon={<UploadCloud className="h-5 w-5" />}>
              <div className="space-y-3">
                {filteredRecipes.map((recipe) => (
                  <div key={recipe.id} className="flex items-center justify-between gap-4 rounded-xl border border-[#222] bg-black p-4">
                    <div>
                      <strong>{recipe.title}</strong>
                      <p className="mt-1 text-xs text-[color:var(--text-secondary)]">
                        {recipe.ebook_categories?.title ?? "Sem categoria"}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => openEditRecipe(recipe)}
                        className="rounded-lg border border-[#222] p-2 text-[color:var(--text-secondary)] hover:border-[rgba(var(--brand-yellow-rgb),0.4)] hover:text-[color:var(--brand-yellow)]"
                        aria-label="Editar receita"
                      >
                        <Edit3 className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteRecipe(recipe.id)}
                        className="rounded-lg border border-[#222] p-2 text-[color:var(--text-secondary)] hover:border-red-500/40 hover:text-red-400"
                        aria-label="Apagar receita"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </Panel>

            {editingRecipe && (
              <section className="lg:col-span-2">
                <Panel
                  title={`Editar: ${editingRecipe.title}`}
                  icon={<Edit3 className="h-5 w-5" />}
                  action={
                    <button
                      type="button"
                      onClick={() => setEditingRecipe(null)}
                      className="rounded-lg border border-[#222] p-2 text-[color:var(--text-secondary)] hover:text-white"
                      aria-label="Fechar edição"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  }
                >
                  <RecipeForm
                    categories={filteredCategories}
                    form={editForm}
                    setForm={setEditForm}
                    onSubmit={updateRecipe}
                    submitLabel="Salvar alterações"
                    large
                    uploadImage={uploadImage}
                  />
                </Panel>
              </section>
            )}
          </div>
        )}

        {tab === "ai" && (
          <div className="mt-8 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
            <Panel title="Texto bruto para Gemini" icon={<BrainCircuit className="h-5 w-5" />}>
              <Area
                label="Cole aqui receitas, PDFs copiados, listas ou blocos soltos"
                value={rawText}
                onChange={setRawText}
                rows={14}
              />
              <button
                type="button"
                onClick={generateDrafts}
                disabled={loading}
                className="pombaz-button group mt-5 w-full"
              >
                {loading ? "Gerando..." : "Gerar rascunhos com IA"}
                <ArrowRight className="h-4 w-4 pombaz-arrow" />
              </button>
            </Panel>

            <Panel title="Rascunhos da IA" icon={<BrainCircuit className="h-5 w-5" />}>
              <div className="space-y-4">
                {drafts.length === 0 ? (
                  <p className="text-sm text-[color:var(--text-secondary)]">
                    Os rascunhos aparecem aqui. Depois você adiciona a imagem e publica.
                  </p>
                ) : (
                  drafts.map((draft, index) => (
                    <div key={`${draft.title}-${index}`} className="rounded-2xl border border-[#222] bg-black p-4">
                      <div className="flex flex-col justify-between gap-3 md:flex-row md:items-start">
                        <div>
                          <span className="text-xs uppercase tracking-[0.18em] text-[color:var(--brand-yellow)]">
                            {draft.category_title}
                          </span>
                          <h3 className="mt-2 font-[family:var(--font-heading)] text-xl font-bold">
                            {draft.title}
                          </h3>
                          {draft.subtitle && (
                            <p className="mt-2 text-sm text-[color:var(--text-secondary)]">
                              {draft.subtitle}
                            </p>
                          )}
                        </div>
                        <button type="button" onClick={() => saveDraft(draft, index)} className="pombaz-button group shrink-0">
                          Publicar
                          <ArrowRight className="h-4 w-4 pombaz-arrow" />
                        </button>
                      </div>
                      <ImageUploadField
                        imageUrl={draftImages[index] ?? ""}
                        label="Imagem da receita"
                        onChange={(url) => setDraftImages((current) => ({ ...current, [index]: url }))}
                        uploadImage={uploadImage}
                      />
                    </div>
                  ))
                )}
              </div>
            </Panel>
          </div>
        )}

        {tab === "access" && (
          <div className="mt-8 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
            <Panel title="Liberar acesso" icon={<Lock className="h-5 w-5" />}>
              <form onSubmit={grantAccess} className="space-y-4">
                <Field label="Email do cliente" type="email" value={accessEmail} onChange={setAccessEmail} />
                <button type="submit" className="pombaz-button group w-full">
                  Liberar ebook
                  <ArrowRight className="h-4 w-4 pombaz-arrow" />
                </button>
              </form>
            </Panel>

            <Panel title="Emails liberados" icon={<UploadCloud className="h-5 w-5" />}>
              <div className="space-y-3">
                {filteredAccessList.map((access) => (
                  <div key={access.id} className="flex items-center justify-between gap-4 rounded-xl border border-[#222] bg-black p-4">
                    <div>
                      <strong>{access.email}</strong>
                      <p className="mt-1 text-xs text-[color:var(--text-secondary)]">
                        {access.has_access ? `Ativo em ${selectedProduct?.title ?? "ebook"}` : "Bloqueado"}
                      </p>
                    </div>
                    {access.has_access && (
                      <button
                        type="button"
                        onClick={() => revokeAccess(access.id)}
                        className="rounded-lg border border-[#222] px-3 py-2 text-xs uppercase tracking-[0.12em] text-[color:var(--text-secondary)] hover:border-red-500/40 hover:text-red-400"
                      >
                        Remover
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </Panel>
          </div>
        )}
      </div>
    </AdminShell>
  )
}

function AdminShell({ children, onSignOut }: { children: ReactNode; onSignOut: () => void }) {
  return (
    <main className="min-h-screen bg-black text-white">
      <header className="border-b border-[#1e1e1e]">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 md:px-0">
          <a href="/" className="flex items-center gap-3" aria-label="POMBAZ">
            <img src="/Pombazlogo.webp" alt="POMBAZ" className="h-9 w-9 object-contain" />
            <span className="font-[family:var(--font-heading)] text-2xl font-bold tracking-[-0.03em]">
              POMBAZ
            </span>
          </a>
          <button type="button" onClick={onSignOut} className="pombaz-button pombaz-button-outline group">
            Sair
            <LogOut className="h-3.5 w-3.5" />
          </button>
        </div>
      </header>
      {children}
    </main>
  )
}

function Panel({
  action,
  title,
  icon,
  children,
}: {
  action?: ReactNode
  title: string
  icon: ReactNode
  children: ReactNode
}) {
  return (
    <section className="rounded-[2rem] border border-[#1e1e1e] bg-[#080808] p-5 shadow-2xl md:p-6">
      <div className="mb-6 flex items-center justify-between gap-4 border-b border-[#1e1e1e] pb-5">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[rgba(var(--brand-yellow-rgb),0.12)] text-[color:var(--brand-yellow)]">
            {icon}
          </div>
          <h2 className="font-[family:var(--font-heading)] text-xl font-bold">{title}</h2>
        </div>
        {action}
      </div>
      {children}
    </section>
  )
}

function RecipeForm({
  categories,
  form,
  large = false,
  setForm,
  onSubmit,
  submitLabel = "Publicar receita",
  uploadImage,
}: {
  categories: EbookCategory[]
  form: RecipeFormState
  large?: boolean
  setForm: Dispatch<SetStateAction<RecipeFormState>>
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
  submitLabel?: string
  uploadImage: (file: File) => Promise<string>
}) {
  return (
    <form onSubmit={onSubmit} className={large ? "grid gap-5 lg:grid-cols-2" : "space-y-4"}>
      <div className={large ? "space-y-4" : "space-y-4"}>
        <label className="block text-sm text-[color:var(--text-secondary)]">
          Categoria
          <select
            value={form.categoryId}
            onChange={(event) => setForm((current) => ({ ...current, categoryId: event.target.value }))}
            className="mt-2 h-12 w-full rounded-lg border border-[#222] bg-black px-4 text-white outline-none focus:border-[color:var(--brand-yellow)]"
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.title}
              </option>
            ))}
          </select>
        </label>
        <Field label="Título" value={form.title} onChange={(value) => setForm((current) => ({ ...current, title: value }))} />
        <Field label="Subtítulo" value={form.subtitle} onChange={(value) => setForm((current) => ({ ...current, subtitle: value }))} />
        <ImageUploadField
          imageUrl={form.imageUrl}
          label="Imagem da receita"
          onChange={(url) => setForm((current) => ({ ...current, imageUrl: url }))}
          uploadImage={uploadImage}
        />
        <Area label="Ingredientes (um por linha)" value={form.ingredients} onChange={(value) => setForm((current) => ({ ...current, ingredients: value }))} rows={large ? 9 : 5} />
      </div>
      <div className={large ? "space-y-4" : "space-y-4"}>
        <Area label="Modo de preparo (um passo por linha)" value={form.preparation} onChange={(value) => setForm((current) => ({ ...current, preparation: value }))} rows={large ? 9 : 5} />
        <Area label="Nutricional em JSON" value={form.nutrition} onChange={(value) => setForm((current) => ({ ...current, nutrition: value }))} rows={large ? 8 : 6} />
      </div>
      <button type="submit" className={`pombaz-button group w-full ${large ? "lg:col-span-2" : ""}`}>
        {submitLabel}
        <ArrowRight className="h-4 w-4 pombaz-arrow" />
      </button>
    </form>
  )
}

function Field({
  className = "",
  label,
  onChange,
  placeholder,
  type = "text",
  value,
}: {
  className?: string
  label: string
  onChange: (value: string) => void
  placeholder?: string
  type?: string
  value: string
}) {
  return (
    <label className={`block text-sm text-[color:var(--text-secondary)] ${className}`}>
      {label}
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 h-12 w-full rounded-lg border border-[#222] bg-black px-4 text-white outline-none focus:border-[color:var(--brand-yellow)]"
      />
    </label>
  )
}

function Area({
  label,
  onChange,
  rows = 4,
  value,
}: {
  label: string
  onChange: (value: string) => void
  rows?: number
  value: string
}) {
  return (
    <label className="block text-sm text-[color:var(--text-secondary)]">
      {label}
      <textarea
        rows={rows}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full rounded-lg border border-[#222] bg-black px-4 py-3 text-white outline-none focus:border-[color:var(--brand-yellow)]"
      />
    </label>
  )
}

function ImageUploadField({
  imageUrl,
  label,
  onChange,
  uploadImage,
}: {
  imageUrl: string
  label: string
  onChange: (url: string) => void
  uploadImage: (file: File) => Promise<string>
}) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState("")

  async function handleFile(file?: File) {
    if (!file) return

    setUploading(true)
    setError("")

    try {
      const url = await uploadImage(file)
      onChange(url)
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Erro ao enviar imagem.")
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="block text-sm text-[color:var(--text-secondary)]">
      <span>{label}</span>
      <label className="mt-2 flex cursor-pointer flex-col overflow-hidden rounded-xl border border-[#222] bg-black transition hover:border-[rgba(var(--brand-yellow-rgb),0.45)]">
        {imageUrl ? (
          <img src={imageUrl} alt="" className="h-52 w-full object-cover" />
        ) : (
          <div className="flex h-52 items-center justify-center px-4 text-center text-xs uppercase tracking-[0.16em] text-[color:var(--text-muted)]">
            Escolher imagem da galeria
          </div>
        )}
        <div className="flex items-center justify-between border-t border-[#222] px-4 py-3">
          <span className="font-[family:var(--font-heading)] text-xs font-bold uppercase tracking-[0.14em] text-white">
            {uploading ? "Enviando..." : imageUrl ? "Trocar imagem" : "Enviar imagem"}
          </span>
          <UploadCloud className="h-4 w-4 text-[color:var(--brand-yellow)]" />
        </div>
        <input
          type="file"
          accept="image/*"
          className="sr-only"
          onChange={(event) => handleFile(event.target.files?.[0])}
        />
      </label>
      {imageUrl && (
        <button
          type="button"
          onClick={() => onChange("")}
          className="mt-2 text-xs uppercase tracking-[0.14em] text-[color:var(--text-muted)] hover:text-white"
        >
          Remover imagem
        </button>
      )}
      {error && <p className="mt-2 text-xs text-[color:var(--brand-yellow)]">{error}</p>}
    </div>
  )
}

function safeParseNutrition(value: string) {
  try {
    const parsed = JSON.parse(value)
    return typeof parsed === "object" && parsed ? parsed : {}
  } catch {
    return {}
  }
}
