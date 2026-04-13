import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import rateLimit from 'express-rate-limit'
import contactRouter from './routes/contact.js'

const app = express()
const PORT = process.env.PORT || 5000

// ── Middleware ──────────────────────────────────────────────
app.use(cors({
  origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
  methods: ['GET', 'POST'],
}))

app.use(express.json())

// Rate limiting — max 10 contact submissions per 15 min per IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { success: false, message: 'Too many requests. Please try again later.' },
})
app.use('/api/contact', limiter)

// ── Routes ──────────────────────────────────────────────────
app.use('/api/contact', contactRouter)

// Health check
app.get('/api/health', (_req, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }))

// 404 handler
app.use((_req, res) => res.status(404).json({ success: false, message: 'Route not found.' }))

// Global error handler
app.use((err, _req, res, _next) => {
  console.error('[Server Error]', err)
  res.status(500).json({ success: false, message: 'Internal server error.' })
})

// ── Start ────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✅  Info-Tech API running on http://localhost:${PORT}`)
})
