export type BillingAdapterErrorCause = 'connection' | 'auth' | 'not_found' | 'invalid_response'

/**
 * The one error shape every billing-adapter port throws — callers outside
 * billing-adapter never see raw HostBill error payloads or field names
 * (constitution Principle I; contracts/billing-adapter-ports.md).
 *
 * Written without TS parameter-property sugar (`constructor(public x: T)`)
 * on purpose: `hostbill-connectivity-check.ts` runs via Node's
 * `--experimental-strip-types`, which only erases type annotations and
 * doesn't support TS-only syntax that has no direct JS equivalent.
 */
export class BillingAdapterError extends Error {
  billingCause: BillingAdapterErrorCause

  constructor(billingCause: BillingAdapterErrorCause, message: string) {
    super(message)
    this.name = 'BillingAdapterError'
    this.billingCause = billingCause
  }
}
