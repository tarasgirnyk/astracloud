import nodemailer from 'nodemailer'

export interface ColocationBookingRequest {
  phone: string
  email: string
  configuration: {
    units: number
    power: string
    ip: string
    speed: string
    monthlyTotal: number
    setupTotal: number
    currency: string
  }
}

export async function sendColocationBookingEmail(request: ColocationBookingRequest): Promise<void> {
  const user = process.env.GMAIL_SMTP_USER
  const appPassword = process.env.GMAIL_SMTP_APP_PASSWORD
  const recipient = process.env.CONSULTATION_RECIPIENT_EMAIL || user

  if (!user || !appPassword || !recipient) {
    throw new Error('Gmail SMTP is not configured.')
  }

  const transporter = nodemailer.createTransport({ service: 'gmail', auth: { user, pass: appPassword } })
  const { phone, email, configuration } = request
  const lines = [
    `Кількість юнітів: ${configuration.units}U`,
    `Потужність блоків живлення: ${configuration.power}`,
    `Кількість IP: ${configuration.ip}`,
    `Швидкість інтернету: ${configuration.speed}`,
    `Щомісячна вартість: ${configuration.monthlyTotal} ${configuration.currency}`,
    `Одноразова інсталяція: ${configuration.setupTotal} ${configuration.currency}`,
  ]

  await transporter.sendMail({
    from: `"Astra Cloud — сайт" <${user}>`,
    to: recipient,
    replyTo: email,
    subject: 'Нове бронювання конфігурації колокації',
    text: `Телефон: ${phone}\nEmail: ${email}\n\n${lines.join('\n')}`,
    html: `<h2>Бронювання конфігурації колокації</h2>
      <p><strong>Телефон:</strong> ${escapeHtml(phone)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <hr><ul>${lines.map((line) => `<li>${escapeHtml(line)}</li>`).join('')}</ul>`,
  })
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char] ?? char)
}
