import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

// Next.js 16 renamed the "middleware" file convention to "proxy" — this is
// the same next-intl locale-routing logic, just under the new filename.
export default createMiddleware(routing)

export const config = {
  // Run on every path except Payload's own admin/API routes, Next.js
  // internals, and static files — the public (frontend) route group is the
  // only thing that needs locale routing.
  matcher: ['/((?!api|admin|_next|.*\\..*).*)'],
}
