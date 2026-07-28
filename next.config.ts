import type { NextConfig } from 'next'
import { withPayload } from '@payloadcms/next/withPayload'
import createNextIntlPlugin from 'next-intl/plugin'
import { redirectMap } from './src/lib/seo/redirect-map'

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Permanent redirects from the old WordPress site (cloud.astra.in.ua,
  // still live in production) to this rebuild — see
  // specs/002-seo-foundations/contracts/seo-metadata-contracts.md and
  // src/lib/seo/redirect-map.ts. Required before this app can take over the
  // production domain without losing the old site's existing search
  // rankings/backlinks.
  async redirects() {
    return redirectMap
  },
}

export default withPayload(withNextIntl(nextConfig))
