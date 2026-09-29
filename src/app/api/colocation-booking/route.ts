import { NextRequest, NextResponse } from 'next/server'
import { sendColocationBookingEmail } from '@/lib/send-colocation-booking-email'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: NextRequest) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid JSON body' }, { status: 400 })
  }

  if (!body || typeof body !== 'object') return NextResponse.json({ success: false }, { status: 400 })
  const { phone, email, configuration } = body as Record<string, unknown>
  if (typeof phone !== 'string' || !phone.trim() || phone.length > 200) return NextResponse.json({ success: false }, { status: 400 })
  if (typeof email !== 'string' || !EMAIL_PATTERN.test(email) || email.length > 200) return NextResponse.json({ success: false }, { status: 400 })
  if (!configuration || typeof configuration !== 'object') return NextResponse.json({ success: false }, { status: 400 })

  const config = configuration as Record<string, unknown>
  const valid =
    typeof config.units === 'number' && Number.isFinite(config.units) && config.units >= 1 && config.units <= 42 &&
    ['power', 'ip', 'speed', 'currency'].every((key) => typeof config[key] === 'string' && String(config[key]).length <= 200) &&
    ['monthlyTotal', 'setupTotal'].every((key) => typeof config[key] === 'number' && Number.isFinite(config[key]) && Number(config[key]) >= 0)
  if (!valid) return NextResponse.json({ success: false }, { status: 400 })

  try {
    await sendColocationBookingEmail({
      phone: phone.trim(),
      email: email.trim(),
      configuration: config as unknown as Parameters<typeof sendColocationBookingEmail>[0]['configuration'],
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to send colocation booking email:', error)
    return NextResponse.json({ success: false }, { status: 502 })
  }
}
