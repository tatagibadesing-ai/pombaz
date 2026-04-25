import type { Metadata } from "next"
import { EbookClient } from "./ebook-client"

export const metadata: Metadata = {
  title: "Ebook Receita Magica | POMBAZ",
  description: "Area protegida do ebook Receita Magica da POMBAZ.",
}

export default function EbookPage() {
  return <EbookClient />
}
