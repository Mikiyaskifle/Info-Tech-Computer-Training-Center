# Info-Tech Computer Training Center

A production-ready frontend-only website for Info-Tech Computer Training Center.

**General Manager:** Andualem Kebebe  
**Stack:** React (Vite) | Tailwind CSS | Framer Motion | EmailJS

---

## Project Structure

```
/
└── client/
    ├── src/
    │   ├── components/     # Navbar, Hero, About, Courses, Contact, Footer, ScrollToTop
    │   ├── services/
    │   │   └── contactApi.js   # EmailJS + Telegram (no backend needed)
    │   └── App.jsx
    ├── .env.example
    └── package.json
```

---

## Quick Start

```bash
cd client
cp .env.example .env        # fill in your credentials
npm install
npm run dev
```

Open **http://localhost:5173**

---

## Environment Variables (`client/.env`)

| Variable | Description |
|---|---|
| `VITE_EMAILJS_SERVICE_ID` | EmailJS service ID |
| `VITE_EMAILJS_TEMPLATE_ID` | EmailJS template ID |
| `VITE_EMAILJS_PUBLIC_KEY` | EmailJS public key |
| `VITE_TELEGRAM_BOT_TOKEN` | Telegram bot token from @BotFather |
| `VITE_TELEGRAM_CHAT_ID` | Your chat ID from @userinfobot |

---

## Setting Up EmailJS (Free — No Backend)

1. Sign up at **https://www.emailjs.com** (free tier: 200 emails/month)
2. **Add a Service** → connect your Gmail
3. **Create a Template** — use these variables in the template body:
   ```
   From: {{from_name}} ({{from_email}})
   Phone: {{phone}}
   Course: {{course}}
   Message: {{message}}
   ```
4. Copy your **Service ID**, **Template ID**, and **Public Key** into `client/.env`

## Setting Up Telegram Bot (Optional)

1. Message **@BotFather** on Telegram → `/newbot` → copy the token
2. Message **@userinfobot** → copy your chat ID
3. Add both to `client/.env`
