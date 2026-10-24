import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Build a `tel:` href that preserves the international country code.
 * "+1 (210) 732-3400" -> "tel:+12107323400"
 */
export function telHref(phone: string) {
  return `tel:+${phone.replace(/\D/g, "")}`
}

/**
 * Build a `mailto:` href with an optional prefilled subject.
 * The address is never shown in the UI — only used to launch the mail client.
 */
export function mailtoHref(email: string, subject?: string) {
  return subject
    ? `mailto:${email}?subject=${encodeURIComponent(subject)}`
    : `mailto:${email}`
}

/**
 * Serialize data for safe inline embedding in a `<script>` tag (e.g. JSON-LD).
 * `JSON.stringify` alone can emit `</script>` or the U+2028/U+2029 separators,
 * which break out of the script element; escaping them keeps the block inert
 * and still-valid JSON. Defense-in-depth — today every value is author-authored,
 * but this stays safe if a value ever becomes CMS- or user-sourced.
 */
export function jsonLdHtml(data: unknown) {
  const ls = String.fromCharCode(0x2028)
  const ps = String.fromCharCode(0x2029)
  return JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")
    .replace(new RegExp(ls, "g"), "\\u2028")
    .replace(new RegExp(ps, "g"), "\\u2029")
}
