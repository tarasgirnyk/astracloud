/**
 * Reads the `portal-readonly` scoped key — the only HostBill credential this
 * feature uses. Throws early and clearly if misconfigured, rather than
 * failing confusingly deep inside a fetch call — see FR-008's "reports a
 * clear failure" requirement.
 */
export function getHostbillReadonlyConfig(): {
  apiUrl: string
  apiId: string
  apiKey: string
} {
  const apiUrl = process.env.HOSTBILL_API_URL
  const apiId = process.env.HOSTBILL_PORTAL_READONLY_API_ID
  const apiKey = process.env.HOSTBILL_PORTAL_READONLY_API_KEY

  if (!apiUrl || !apiId || !apiKey) {
    throw new Error(
      'Missing HostBill read-only credentials: set HOSTBILL_API_URL, ' +
        'HOSTBILL_PORTAL_READONLY_API_ID, and HOSTBILL_PORTAL_READONLY_API_KEY in .env.',
    )
  }

  return { apiUrl, apiId, apiKey }
}
