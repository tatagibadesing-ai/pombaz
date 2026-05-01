export type ProtocolGuide = {
  id: string
  title: string
  slug: string
  welcome_text: string
  conclusion_text: string
  is_published: boolean
  sort_order: number
  created_at: string
  updated_at: string
}

export type ProtocolExercise = {
  id: string
  guide_id: string
  title: string
  paragraph_anatomy: string
  paragraph_technique: string
  paragraph_sets: string
  sort_order: number
  images: ProtocolExerciseImage[]
  created_at: string
  updated_at: string
}

export type ProtocolExerciseImage = {
  url: string
  caption: string
}

export type GeminiProtocolDraft = {
  title: string
  paragraph_anatomy: string
  paragraph_technique: string
  paragraph_sets: string
}
