# Info-Tech Computer Training Center

A full-stack production-ready website for Info-Tech Computer Training Center.

**General Manager:** Andualem Kebebe  
**Stack:** React (Vite) + Node.js/Express | Tailwind CSS | Framer Motion

---

## Project Structure

```
/
├── client/          # React frontend (Vite)
│   ├── src/
│   │   ├── components/   # Navbar, Hero, About, Courses, Contact, Footer, ScrollToTop
│   │   ├── services/     # contactApi.js (fetch wrapper)
│   │   └── App.jsx
│   └── package.json
│
└── server/          # Node.js + Express backend
    ├── routes/
    │   └── contact.js    # POST /api/contact
    ├── server.js
    ├── .env.example
    └── package.json
```

---

## Quick Start

### 1. Setup the Backend

```bash
cd server
cp .env.example .env
# Fill in your credentials in .env
npm install
npm run dev
```

### 2. Setup the Frontend

```bash
cd client
npm install
npm run dev
```

Open **http://localhost:5173** in your browser.

---

## Environment Variables (server/.env)

| Variable | Description |
|---|---|
| `PORT` | Server port (default: 5000) |
| `CLIENT_ORIGIN` | Frontend URL for CORS |
| `EMAIL_USER` | Your Gmail address |
| `EMAIL_PASS` | Gmail App Password (not your real password) |
| `TELEGRAM_BOT_TOKEN` | Telegram bot token from @BotFather |
| `TELEGRAM_CHAT_ID` | Your Telegram chat ID from @userinfobot |

### Getting a Gmail App Password
1. Enable 2-Step Verification on your Google account
2. Go to https://myaccount.google.com/apppasswords
3. Generate a password for "Mail" → use it as `EMAIL_PASS`

### Getting Telegram Credentials
1. Message **@BotFather** on Telegram → `/newbot` → copy the token
2. Message **@userinfobot** → copy your chat ID

---

## Features

- Dark mode UI with blue accent theme
- Fully responsive (mobile-first)
- Framer Motion animations throughout
- Contact form with full validation
- Email notifications via Nodemailer (Gmail)
- Telegram bot notifications
- Rate limiting on API
- Scroll-to-top button
