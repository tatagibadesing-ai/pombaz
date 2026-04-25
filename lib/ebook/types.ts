export type EbookProduct = {
  id: string
  title: string
  slug: string
  description: string | null
  accent_color: string
  accent_rgb: string
  sort_order: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export type EbookCategory = {
  id: string
  product_id: string
  title: string
  slug: string
  description: string | null
  sort_order: number
  is_published: boolean
  created_at: string
  updated_at: string
  ebook_products?: Pick<EbookProduct, "id" | "title" | "slug" | "accent_color" | "accent_rgb"> | null
}

export type EbookRecipe = {
  id: string
  category_id: string
  title: string
  subtitle: string | null
  image_url: string | null
  ingredients: string[]
  preparation_steps: string[]
  nutrition: Record<string, string | number>
  notes: string | null
  sort_order: number
  is_published: boolean
  created_at: string
  updated_at: string
  ebook_categories?: Pick<EbookCategory, "id" | "title" | "slug" | "sort_order"> | null
}

export type EbookAccess = {
  id: string
  email: string
  product_id: string
  has_access: boolean
  notes: string | null
  created_at: string
  updated_at: string
  ebook_products?: Pick<EbookProduct, "id" | "title" | "slug" | "accent_color" | "accent_rgb"> | null
}

export type GeminiRecipeDraft = {
  category_title: string
  title: string
  subtitle?: string
  ingredients: string[]
  preparation_steps: string[]
  nutrition: Record<string, string | number>
  notes?: string
}
