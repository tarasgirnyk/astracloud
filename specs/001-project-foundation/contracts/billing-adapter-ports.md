# Contract: `billing-adapter` Ports

Per constitution Principle I, everything outside `billing-adapter` MUST
depend only on these port interfaces — never on
`billing-adapter/adapters/hostbill/*` directly. This feature implements the
ports below (the HostBill-backed adapter) but only exercises
`ProductCatalogProvider` end-to-end (the connectivity smoke test, User Story
3). The other three ports are defined now so later features (VPS page,
Checkout) implement against a stable, already-agreed shape rather than
inventing it under deadline pressure.

All methods are `async` and MAY throw a `BillingAdapterError` (a single,
adapter-defined error type) on any HostBill failure — callers never see raw
HostBill error payloads or field names.

## `ProductCatalogProvider` (implemented and exercised in this feature)

```ts
interface ProductCatalogProvider {
  listProducts(params: { groupSlug?: string }): Promise<ProductSummary[]>;
  getProductDetails(productId: string): Promise<ProductDetails>;
  listCurrencies(): Promise<CurrencyOption[]>;
}

interface ProductSummary {
  id: string;
  name: string;
  fromPrice: { amount: number; currency: string };
}

interface ProductDetails extends ProductSummary {
  specs: Record<string, string>; // e.g. { cpu: "...", ram: "...", disk: "..." }
  billingCycles: string[];
}

interface CurrencyOption {
  code: string; // "UAH" | "USD" | "EUR"
  isDefault: boolean;
}
```

**Used by this feature for**: the read-only connectivity smoke test (US3) —
calling `listProducts({})` and confirming a non-error, non-empty response
proves the `portal-readonly` credentials and adapter wiring work end-to-end.

## `ClientProvider` (defined, not yet called by this feature)

```ts
interface ClientProvider {
  findByEmail(email: string): Promise<{ exists: boolean; hostbillClientId?: string }>;
  verifyLogin(email: string, password: string): Promise<{ valid: boolean; hostbillClientId?: string }>;
  createClient(input: NewClientInput): Promise<{ hostbillClientId: string }>;
}
```

**Future use**: Checkout feature, step 2 (email-exists check, existing-client
login, new-client creation) — see `docs/GRILL_NOTES.md` decision 6.

## `OrderProvider` (defined, not yet called by this feature)

```ts
interface OrderProvider {
  createOrder(input: NewOrderInput): Promise<{ hostbillOrderId: string; invoiceId: string }>;
}
```

**Future use**: Checkout feature, step 3 (order/invoice creation on
"Оформити замовлення").

## `InvoiceProvider` (defined, not yet called by this feature)

```ts
interface InvoiceProvider {
  getPaymentModules(): Promise<PaymentModuleOption[]>;
  getInvoiceStatus(invoiceId: string): Promise<"pending" | "paid" | "failed">;
}
```

**Future use**: Checkout feature, step 3 (payment method list) and the
post-payment status page.

## Error shape (shared across all ports)

```ts
class BillingAdapterError extends Error {
  readonly cause: "connection" | "auth" | "not_found" | "invalid_response";
}
```

Callers (Payload blocks, route handlers) MUST handle this error type and
present a domain-appropriate fallback (e.g. "pricing temporarily unavailable")
rather than letting a HostBill-shaped error surface to the UI.
