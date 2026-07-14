/**
 * Shared helper for seeding native-localized collections (Pages,
 * ServicePages): one document per slug, written once per locale via
 * `payload.create`/`update({ locale, data })`.
 *
 * Payload's array/blocks fields track row identity by `id` — if a
 * locale-scoped write doesn't include the SAME `id` for a row that already
 * exists (from a previous locale's write to the same document), Payload
 * treats it as a brand new row and drops the old one (cascade-deleting its
 * other-locale sibling data). `preserveIds` recursively copies `id`s from
 * the document-as-it-currently-exists into the new locale's payload, at
 * every array nesting level (blocks, and any array nested inside a block),
 * matched by index position — safe only because every locale's block/array
 * structure is identical (same count, same order), which is the invariant
 * this project's native-localization model relies on.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function preserveIds(newValue: any, oldValue: any): any {
  if (Array.isArray(newValue)) {
    const oldArray = Array.isArray(oldValue) ? oldValue : []
    return newValue.map((item, i) => preserveIds(item, oldArray[i]))
  }
  if (newValue && typeof newValue === 'object' && oldValue && typeof oldValue === 'object') {
    const merged = { ...newValue }
    if (oldValue.id !== undefined) {
      merged.id = oldValue.id
    }
    for (const key of Object.keys(newValue)) {
      if (Array.isArray(newValue[key])) {
        merged[key] = preserveIds(newValue[key], oldValue[key])
      }
    }
    return merged
  }
  return newValue
}

type Locale = 'ua' | 'en' | 'pl'
const LOCALES: Locale[] = ['ua', 'en', 'pl']

/**
 * Seeds one document (by slug) across all three locales, in order, so each
 * write after the first preserves the previous writes' row ids. Returns the
 * final document (as returned by the last locale's write).
 */
export async function seedLocalizedDoc(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: any,
  collection: 'pages' | 'service-pages',
  slug: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dataByLocale: Record<Locale, Record<string, any>>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> {
  const existing = await payload.find({ collection, where: { slug: { equals: slug } }, limit: 1 })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let doc: any = existing.docs[0]

  for (const locale of LOCALES) {
    const data = doc ? preserveIds(dataByLocale[locale], doc) : dataByLocale[locale]

    if (doc) {
      doc = await payload.update({ collection, id: doc.id, locale, data })
    } else {
      doc = await payload.create({ collection, locale, data })
    }
  }

  return doc
}
