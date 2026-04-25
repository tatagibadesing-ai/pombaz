export const POMBAZ_ADMIN_EMAIL = "2closett@gmail.com"

export function isPombazAdmin(email?: string | null) {
  return email?.toLowerCase() === POMBAZ_ADMIN_EMAIL
}
