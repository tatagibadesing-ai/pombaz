import { Navbar } from "@/components/pombaz/navbar"
import { Hero } from "@/components/pombaz/hero"
import { Products } from "@/components/pombaz/products"
import { About } from "@/components/pombaz/about"
import { Quote } from "@/components/pombaz/quote"
import { FinalCta } from "@/components/pombaz/cta"
import { Footer } from "@/components/pombaz/footer"

export default function Page() {
  return (
    <main className="min-h-screen bg-background font-sans text-foreground">
      <Navbar />
      <Hero />
      <Products />
      <About />
      <Quote />
      <FinalCta />
      <Footer />
    </main>
  )
}
