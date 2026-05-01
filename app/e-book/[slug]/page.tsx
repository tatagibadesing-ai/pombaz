import type { Metadata } from "next"
import { EbookClient } from "@/components/ebook/ebook-client"

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const title = slug === "receita-magica" ? "Receita Mágica" : "Ganhar Massa Muscular"
  
  return {
    title: `${title} | POMBAZ`,
    description: `Acesso exclusivo ao e-book ${title} da POMBAZ.`,
  }
}

export default async function EbookSlugPage({ params }: Props) {
  const { slug } = await params
  return <EbookClient slug={slug} />
}
