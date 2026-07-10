import { getRequestConfig } from 'next-intl/server'
import { hasLocale } from 'next-intl'
import { routing } from './routing'

type Messages = Record<string, unknown>

/**
 * Deep-merges locale-specific messages on top of the Ukrainian base, so any
 * key missing from en.json/pl.json falls back to the Ukrainian copy instead
 * of rendering blank or throwing — see spec.md Assumptions and US2's edge
 * case ("page viewed in a language with no translated content yet").
 */
function mergeWithFallback(base: Messages, override: Messages): Messages {
  const result: Messages = { ...base }
  for (const key of Object.keys(override)) {
    const baseValue = base[key]
    const overrideValue = override[key]
    if (
      baseValue &&
      overrideValue &&
      typeof baseValue === 'object' &&
      typeof overrideValue === 'object' &&
      !Array.isArray(baseValue) &&
      !Array.isArray(overrideValue)
    ) {
      result[key] = mergeWithFallback(baseValue as Messages, overrideValue as Messages)
    } else {
      result[key] = overrideValue
    }
  }
  return result
}

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale

  const baseMessages = (await import('./messages/ua.json')).default as Messages

  if (locale === routing.defaultLocale) {
    return { locale, messages: baseMessages }
  }

  const localeMessages = (await import(`./messages/${locale}.json`)).default as Messages
  return { locale, messages: mergeWithFallback(baseMessages, localeMessages) }
})
