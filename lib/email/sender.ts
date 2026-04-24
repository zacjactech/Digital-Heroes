import { Resend } from 'resend'

export const resend = new Resend(process.env.RESEND_API_KEY!)

export const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL ?? 'noreply@digitalheroesclub.com'

export const FROM_NAME = 'Digital Heroes'

interface SendEmailParams {
  to: string | string[]
  subject: string
  react: React.ReactElement
  replyTo?: string
}

export async function sendEmail({
  to,
  subject,
  react,
  replyTo,
}: SendEmailParams): Promise<void> {
  const { error } = await resend.emails.send({
    from: `${FROM_NAME} <${FROM_EMAIL}>`,
    to,
    subject,
    react,
    replyTo,
  })

  if (error) {
    throw new Error(`Email send failed: ${error.message}`)
  }
}
