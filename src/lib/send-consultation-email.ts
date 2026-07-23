import nodemailer from 'nodemailer'

export interface ConsultationRequest {
  name: string
  phone: string
  email: string
  message: string
}

/**
 * Sends a "Отримати консультацію" form submission to the team inbox via
 * Gmail SMTP (an App Password, not the account password — see .env.example).
 * Simplest option that meets the requirement (constitution Principle VI) —
 * no transactional-email provider/queue until real volume justifies one.
 */
export async function sendConsultationEmail(request: ConsultationRequest): Promise<void> {
  const user = process.env.GMAIL_SMTP_USER
  const appPassword = process.env.GMAIL_SMTP_APP_PASSWORD
  const recipient = process.env.CONSULTATION_RECIPIENT_EMAIL || user

  if (!user || !appPassword || !recipient) {
    throw new Error('Gmail SMTP is not configured (GMAIL_SMTP_USER / GMAIL_SMTP_APP_PASSWORD / CONSULTATION_RECIPIENT_EMAIL).')
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user, pass: appPassword },
  })

  const { name, phone, email, message } = request

  await transporter.sendMail({
    from: `"Astra Cloud — сайт" <${user}>`,
    to: recipient,
    replyTo: email,
    subject: `Заявка на консультацію від ${name}`,
    text: `Ім'я: ${name}\nТелефон: ${phone}\nEmail: ${email}\n\nПовідомлення:\n${message}`,
    html: `
      <p><strong>Ім'я:</strong> ${escapeHtml(name)}</p>
      <p><strong>Телефон:</strong> ${escapeHtml(phone)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Повідомлення:</strong></p>
      <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
    `,
  })
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (char) => {
    switch (char) {
      case '&':
        return '&amp;'
      case '<':
        return '&lt;'
      case '>':
        return '&gt;'
      case '"':
        return '&quot;'
      default:
        return '&#39;'
    }
  })
}
