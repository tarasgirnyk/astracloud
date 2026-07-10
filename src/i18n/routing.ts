import { defineRouting } from 'next-intl/routing'

/**
 * Ukrainian is the default locale and is served with no URL prefix
 * (per docs/GRILL_NOTES.md decision 7); English and Polish live under
 * /en/ and /pl/. `localePrefix: 'as-needed'` is what gives the default
 * locale its prefix-free address.
 *
 * `localeDetection: false` deliberately disables next-intl's Accept-Language-
 * based redirect: a visitor with an English browser hitting "/" still gets
 * the Ukrainian homepage, not an automatic bounce to /en. UA-as-default was
 * a explicit decision (docs/GRILL_NOTES.md), not just "whichever locale
 * happens to be first" — the language switcher is how a visitor opts into
 * a different locale, not browser negotiation.
 */
export const routing = defineRouting({
  locales: ['ua', 'en', 'pl'],
  defaultLocale: 'ua',
  localePrefix: 'as-needed',
  localeDetection: false,
})

export type AppLocale = (typeof routing.locales)[number]
