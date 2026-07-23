import { NextRequest, NextResponse } from 'next/server'
import { sendConsultationEmail } from '@/lib/send-consultation-email'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MAX_FIELD_LENGTH = 200
const MAX_MESSAGE_LENGTH = 5000

function invalid(field: string): NextResponse {
  return NextResponse.json({ success: false, error: `Invalid or missing "${field}"` }, { status: 400 })
}

/**
 * Backs the "Отримати консультацію" modal (see ConsultationModal.tsx) —
 * validates the submission, then hands it to Gmail SMTP (send-consultation-email.ts).
 */
export async function POST(request: NextRequest) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid JSON body' }, { status: 400 })
  }

  if (typeof body !== 'object' || body === null) {
    return NextResponse.json({ success: false, error: 'Invalid JSON body' }, { status: 400 })
  }

  const { name, phone, email, message } = body as Record<string, unknown>

  if (typeof name !== 'string' || !name.trim() || name.length > MAX_FIELD_LENGTH) {
    return invalid('name')
  }
  if (typeof phone !== 'string' || !phone.trim() || phone.length > MAX_FIELD_LENGTH) {
    return invalid('phone')
  }
  if (typeof email !== 'string' || !EMAIL_PATTERN.test(email) || email.length > MAX_FIELD_LENGTH) {
    return invalid('email')
  }
  if (typeof message !== 'string' || !message.trim() || message.length > MAX_MESSAGE_LENGTH) {
    return invalid('message')
  }

  try {
    await sendConsultationEmail({ name: name.trim(), phone: phone.trim(), email: email.trim(), message: message.trim() })
  } catch (error) {
    console.error('Failed to send consultation email:', error)
    return NextResponse.json({ success: false, error: 'Failed to send the request. Please try again later.' }, { status: 502 })
  }

  return NextResponse.json({ success: true })
}
