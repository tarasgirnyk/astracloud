import { NextRequest, NextResponse } from 'next/server'
import { revalidateVpsPricingCache } from '@/blocks/vps-pricing-cards/get-live-products'

/**
 * Manual escape hatch for the VPS pricing cache (10-minute TTL, see
 * get-live-products.ts). Call this after changing a price in HostBill if you
 * don't want to wait out the TTL:
 *
 *   curl -X POST "https://<host>/api/revalidate-vps-pricing?secret=$REVALIDATE_SECRET&categoryId=<hostbillCategoryId>"
 */
export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret')
  if (!secret || secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ success: false, error: 'Invalid or missing secret' }, { status: 401 })
  }

  const categoryId = request.nextUrl.searchParams.get('categoryId')
  if (!categoryId) {
    return NextResponse.json({ success: false, error: 'Missing "categoryId" query param' }, { status: 400 })
  }

  revalidateVpsPricingCache(categoryId)
  return NextResponse.json({ success: true, revalidated: true, categoryId })
}
