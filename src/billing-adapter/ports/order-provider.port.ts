export interface NewOrderInput {
  hostbillClientId: string
  productId: string
  billingCycle: string
  configurableOptions: Record<string, string>
}

/**
 * Defined now, not yet called by any code in this feature — implemented and
 * exercised by the future Checkout feature (step 3, "Оформити замовлення").
 */
export interface OrderProvider {
  createOrder(input: NewOrderInput): Promise<{ hostbillOrderId: string; invoiceId: string }>
}
