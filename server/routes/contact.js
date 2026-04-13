import express from 'express'
import { body, validationResult } from 'express-validator'
import nodemailer from 'nodemailer'
import fetch from 'node-fetch'

const router = express.Router()

// ── Validation rules ─────────────────────────────────────────
const validateContact = [
  body('fullName').trim().isLength({ min: 2 }).withMessage('Full name must be at least 2 characters.'),
  body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email address.'),
  body('phone').trim().matches(/^\+?[\d\s\-()\\.]{7,15}$/).withMessage('Please provide a valid phone number.'),
  body('course')
    .isIn(['Basic Computer', 'Photography', 'Videography', 'Graphic Design'])
    .withMessage('Please select a valid course.'),
  body('message').trim().isLength({ min: 10 }).withMessage('Message must be at least 10 characters.'),
]

// ── Nodemailer transporter ────────────────────────────────────
function createTransporter() {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })
}

// ── Send email ────────────────────────────────────────────────
async function sendEmail({ fullName, email, phone, course, message }) {
  const transporter = createTransporter()

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0d1526; color: #e2e8f0; border-radius: 12px; overflow: hidden;">
      <div style="background: linear-gradient(135deg, #1d4ed8, #2563eb); padding: 30px; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 22px;">📩 New Enrollment Inquiry</h1>
        <p style="color: #bfdbfe; margin: 8px 0 0;">Info-Tech Computer Training Center</p>
      </div>
      <div style="padding: 30px;">
        <table style="width: 100%; border-collapse: collapse;">
          ${[
            ['👤 Full Name', fullName],
            ['📧 Email', email],
            ['📞 Phone', phone],
            ['📚 Course', course],
          ].map(([label, value]) => `
            <tr>
              <td style="padding: 10px 0; color: #93c5fd; font-weight: bold; width: 140px;">${label}</td>
              <td style="padding: 10px 0; color: #e2e8f0;">${value}</td>
            </tr>
          `).join('')}
        </table>
        <div style="margin-top: 20px; padding: 16px; background: #1a2235; border-radius: 8px; border-left: 4px solid #2563eb;">
          <p style="color: #93c5fd; font-weight: bold; margin: 0 0 8px;">💬 Message</p>
          <p style="color: #e2e8f0; margin: 0; line-height: 1.6;">${message}</p>
        </div>
      </div>
      <div style="padding: 16px 30px; background: #111827; text-align: center;">
        <p style="color: #4b5563; font-size: 12px; margin: 0;">Sent from Info-Tech Training Center website</p>
      </div>
    </div>
  `

  await transporter.sendMail({
    from: `"Info-Tech Website" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER,
    replyTo: email,
    subject: `New Enrollment Inquiry — ${course} | ${fullName}`,
    html,
  })
}

// ── Send Telegram message ─────────────────────────────────────
async function sendTelegram({ fullName, email, phone, course, message }) {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (!token || !chatId) {
    console.warn('[Telegram] TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID not set — skipping.')
    return
  }

  const text = `
🎓 *New Enrollment Inquiry — Info-Tech*

👤 *Name:* ${fullName}
📧 *Email:* ${email}
📞 *Phone:* ${phone}
📚 *Course:* ${course}

💬 *Message:*
${message}
  `.trim()

  const url = `https://api.telegram.org/bot${token}/sendMessage`
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'Markdown' }),
  })

  if (!res.ok) {
    const err = await res.json()
    console.error('[Telegram] Failed to send message:', err)
  }
}

// ── POST /api/contact ─────────────────────────────────────────
router.post('/', validateContact, async (req, res) => {
  // Check validation errors
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      message: errors.array()[0].msg,
      errors: errors.array(),
    })
  }

  const { fullName, email, phone, course, message } = req.body

  try {
    // Run email and Telegram in parallel
    await Promise.allSettled([
      sendEmail({ fullName, email, phone, course, message }),
      sendTelegram({ fullName, email, phone, course, message }),
    ])

    return res.status(200).json({
      success: true,
      message: 'Thank you! Your message has been received. We will contact you shortly.',
    })
  } catch (err) {
    console.error('[Contact Route Error]', err)
    return res.status(500).json({
      success: false,
      message: 'Failed to send your message. Please try again later.',
    })
  }
})

export default router
