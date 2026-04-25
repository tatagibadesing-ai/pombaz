import type { Metadata } from "next"
import { AdminClient } from "./admin-client"

export const metadata: Metadata = {
  title: "Admin Receita Magica | POMBAZ",
  description: "Painel administrativo do ebook Receita Magica.",
}

export default function AdminPage() {
  return <AdminClient />
}
