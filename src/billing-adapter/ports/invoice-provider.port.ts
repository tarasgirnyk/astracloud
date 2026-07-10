export interface PaymentModuleOption {
  code: string
  name: string
  logoUrl?: string
}

export type InvoiceStatus = 'pending' | 'paid' | 'failed'

/**
 * Defined now, not yet called by any code in this feature — implemented and
 * exercised by the future Checkout feature (step 3 payment method list, and
 * the post-payment status page).
 */
export interface InvoiceProvider {
  getPaymentModules(): Promise<PaymentModuleOption[]>
  getInvoiceStatus(invoiceId: string): Promise<InvoiceStatus>
}
