import type { Metadata, Viewport } from "next"
import { Inter, Space_Grotesk } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["500", "700"],
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "POMBAZ — Vídeos que grudam. Produtos que vendem.",
  description:
    "A POMBAZ cria conteúdo com IA que captura atenção real e transforma essa atenção em resultado com produtos digitais diretos e úteis.",
  openGraph: {
    title: "POMBAZ — Vídeos que grudam. Produtos que vendem.",
    description:
      "Marca digital de conteúdo com IA focada em vídeos curtos e produtos digitais que entregam resultado real.",
    type: "website",
  },
  icons: {
    icon: [
      { url: "/icon-light-32x32.png", media: "(prefers-color-scheme: light)" },
      { url: "/icon-dark-32x32.png", media: "(prefers-color-scheme: dark)" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-icon.png",
  },
}

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  colorScheme: "dark",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={`${spaceGrotesk.variable} ${inter.variable} bg-background`}>
      <body suppressHydrationWarning className="bg-background font-sans text-foreground antialiased">
        {children}
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}
