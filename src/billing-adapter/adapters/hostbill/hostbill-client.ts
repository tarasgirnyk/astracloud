import { BillingAdapterError } from '../../ports/errors.ts'

/**
 * HostBill's API is a single flat endpoint distinguished by a `call`
 * parameter (not a REST resource tree) — see research.md §3. This is the
 * only place in the codebase that knows that shape; every port's HostBill
 * adapter goes through this, and everything outside billing-adapter/ sees
 * only the ports' domain-shaped return values, never this raw response.
 */
export async function callHostbill<T>(
  config: { apiUrl: string; apiId: string; apiKey: string },
  call: string,
  params: Record<string, string> = {},
): Promise<T> {
  const body = new URLSearchParams({
    api_id: config.apiId,
    api_key: config.apiKey,
    call,
    ...params,
  })

  let response: Response
  try {
    response = await fetch(config.apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
    })
  } catch {
    throw new BillingAdapterError('connection', `Could not reach HostBill at ${config.apiUrl}`)
  }

  if (response.status === 401 || response.status === 403) {
    throw new BillingAdapterError('auth', `HostBill rejected the API credentials (call: ${call})`)
  }

  if (!response.ok) {
    throw new BillingAdapterError(
      'invalid_response',
      `HostBill returned HTTP ${response.status} for call "${call}"`,
    )
  }

  let json: unknown
  try {
    json = await response.json()
  } catch {
    throw new BillingAdapterError('invalid_response', `HostBill response for "${call}" was not valid JSON`)
  }

  if (
    json &&
    typeof json === 'object' &&
    'success' in json &&
    (json as { success: unknown }).success === false
  ) {
    const errorMessage =
      'error' in json && typeof (json as { error: unknown }).error === 'string'
        ? (json as { error: string }).error
        : // HostBill returns { success: false } with no "error" field when the
          // calling API key isn't allowed to use this method (or is IP-
          // restricted to an address that doesn't match the caller) — it
          // doesn't say which, for security reasons. Point at both causes
          // rather than reporting a bare "unknown error".
          `no error detail returned — check that "${call}" is enabled on this ` +
          'API key in HostBill (Settings → Security settings) and that the key ' +
          'has no IP restriction blocking this machine'
    throw new BillingAdapterError('invalid_response', `HostBill call "${call}" failed: ${errorMessage}`)
  }

  return json as T
}
