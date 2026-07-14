import type { ProductSpec } from '../../ports/product-catalog-provider.port.ts'

/**
 * HostBill product `description` is a free-text field with no schema —
 * this team's convention is `"Label:Value<br>Label:Value<br>..."` (confirmed
 * against the real instance, e.g. `"CPU:1 Core<br>RAM:1 Gb<br>...<ul></ul>"`).
 * Parsing happens here, inside the adapter, so this HostBill-specific
 * text convention never leaks past billing-adapter (constitution Principle
 * I) — callers get a clean `{ label, value }[]`.
 *
 * Defensive on purpose: a segment with no `:` (e.g. the trailing `<ul></ul>`
 * artifact seen in real data) is skipped rather than thrown on, since this
 * format isn't schema-enforced in HostBill and could drift.
 */
export function parseHostbillDescription(description?: string): ProductSpec[] {
  if (!description) {
    return []
  }

  return description
    .split('<br>')
    .map((segment) => segment.trim())
    .filter(Boolean)
    .flatMap((segment): ProductSpec[] => {
      const colonIndex = segment.indexOf(':')
      if (colonIndex === -1) {
        return []
      }
      const label = segment.slice(0, colonIndex).trim()
      const value = segment.slice(colonIndex + 1).trim()
      if (!label || !value) {
        return []
      }
      return [{ label, value }]
    })
}
