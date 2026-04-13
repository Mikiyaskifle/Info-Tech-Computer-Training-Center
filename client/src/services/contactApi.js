import emailjs from '@emailjs/browser'

const SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

const TELEGRAM_TOKEN  = import.meta.env.VITE_TELEGRAM_BOT_TOKEN
const TELEGRAM_CHAT   = import.meta.env.VITE_TELEGRAM_CHAT_ID

/**
 * Send email to mikiyaskifle19@gmail.com via EmailJS
 */
async function sendEmail({ fullName, email, phone, course, message }) {
  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
    console.warn('[EmailJS] Missing credentials in .env — skipping email.')
    return
  }

  await emailjs.send(
    SERVICE_ID,
    TEMPLATE_ID,
    {
      from_name:    fullName,   // {{from_name}}
      from_email:   email,      // {{from_email}}
      phone:        phone,      // {{phone}}
      course:       course,     // {{course}}
      message:      message,    // {{message}}
      reply_to:     email,
    },
    PUBLIC_KEY
  )
}

/**
 * Send Telegram notification (optional)
 */
async function sendTelegram({ fullName, email, phone, course, message }) {
  if (!TELEGRAM_TOKEN || !TELEGRAM_CHAT) return

  const text = [
    `🎓 *New Enrollment — Info-Tech*`,
    ``,
    `👤 *Name:* ${fullName}`,
    `📧 *Email:* ${email}`,
    `📞 *Phone:* ${phone}`,
    `📚 *Course:* ${course}`,
    ``,
    `💬 *Message:*`,
    message,
  ].join('\n')

  await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: TELEGRAM_CHAT, text, parse_mode: 'Markdown' }),
  })
}

/**
 * Main export — called from Contact.jsx
 */
export async function submitContactForm(formData) {
  const results = await Promise.allSettled([
    sendEmail(formData),
    sendTelegram(formData),
  ])

  const allFailed = results.every(r => r.status === 'rejected')
  if (allFailed) {
    const err = results[0].reason
    throw new Error(err?.text || err?.message || 'Failed to send. Please try again.')
  }

  return {
    success: true,
    message: 'Thank you! Your message has been received. We will contact you shortly.',
  }
}
