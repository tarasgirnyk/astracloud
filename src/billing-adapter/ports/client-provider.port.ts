export interface NewClientInput {
  email: string
  password: string
  firstName: string
  lastName: string
}

/**
 * Defined now, not yet called by any code in this feature — implemented and
 * exercised by the future Checkout feature (docs/GRILL_NOTES.md decision 6).
 * Kept here so that feature builds against an already-agreed shape instead
 * of inventing one under deadline pressure.
 */
export interface ClientProvider {
  findByEmail(email: string): Promise<{ exists: boolean; hostbillClientId?: string }>
  verifyLogin(email: string, password: string): Promise<{ valid: boolean; hostbillClientId?: string }>
  createClient(input: NewClientInput): Promise<{ hostbillClientId: string }>
}
