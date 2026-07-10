import type { CollectionConfig } from 'payload'

/**
 * Operator/administrator accounts for the admin interface (FR-001). Not to
 * be confused with the future customer-facing account system — see
 * constitution Principle IX and spec.md Assumptions ("no end-customer-
 * facing account creation... is in scope for this feature").
 */
export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
  },
  fields: [],
}
