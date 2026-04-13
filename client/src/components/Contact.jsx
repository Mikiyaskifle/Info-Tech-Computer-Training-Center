import React, { useState, useRef, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  FiSend, FiCheckCircle, FiAlertCircle, FiPhone, FiMail,
  FiMapPin, FiLoader, FiChevronDown, FiX, FiUser,
  FiMessageSquare, FiBookOpen, FiClock, FiAward
} from 'react-icons/fi'
import { useTranslation } from 'react-i18next'
import { submitContactForm } from '../services/contactApi'

const initialForm = { fullName: '', email: '', phone: '', courses: [], message: '' }

function validate(form, errors_t) {
  const errors = { fullName: '', email: '', phone: '', courses: '', message: '' }
  let valid = true
  if (!form.fullName.trim() || form.fullName.trim().length < 2) { errors.fullName = errors_t.fullName; valid = false }
  if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) { errors.email = errors_t.email; valid = false }
  if (!form.phone.trim() || !/^\+?[\d\s\-()\\.]{7,15}$/.test(form.phone)) { errors.phone = errors_t.phone; valid = false }
  if (!form.courses.length) { errors.courses = errors_t.course; valid = false }
  if (!form.message.trim() || form.message.trim().length < 10) { errors.message = errors_t.message; valid = false }
  return { errors, valid }
}

function InputError({ msg }) {
  if (!msg) return null
  return (
    <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
      className="mt-1.5 text-red-400 text-xs flex items-center gap-1.5">
      <FiAlertCircle size={11} /> {msg}
    </motion.p>
  )
}

// ── Floating label input ──────────────────────────────────────
function FloatingInput({ label, icon: Icon, error, children, required }) {
  return (
    <div>
      <label className="block text-gray-400 text-xs font-medium mb-1.5 uppercase tracking-wider">
        {label}
      </label>
      <div className={`relative rounded-xl border transition-all duration-200 overflow-hidden
        ${error
          ? 'border-red-500/60 bg-red-500/5'
          : 'border-white/10 bg-dark-700 hover:border-white/25 focus-within:border-brand-500 focus-within:ring-1 focus-within:ring-brand-500/30'}`}
      >
        {Icon && (
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none z-10">
            <Icon className="text-gray-500 group-focus-within:text-brand-400 transition-colors duration-200" size={15} />
          </div>
        )}
        <div className={Icon ? 'pl-10' : ''}>
          {children}
        </div>
      </div>
      <InputError msg={error} />
    </div>
  )
}

// ── Multi-select course dropdown ──────────────────────────────
function CourseMultiSelect({ options, selected, onChange, placeholder, error }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const handler = (e) => { if (!ref.current?.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const toggle = (option) => {
    onChange(selected.includes(option) ? selected.filter(s => s !== option) : [...selected, option])
  }
  const remove = (e, option) => { e.stopPropagation(); onChange(selected.filter(s => s !== option)) }

  return (
    <div ref={ref} className="relative">
      <button type="button" onClick={() => setOpen(!open)}
        className={`w-full min-h-[50px] rounded-xl px-4 py-2.5 text-left flex items-center justify-between gap-2
          transition-all duration-200 border
          ${error ? 'border-red-500/60 bg-red-500/5' : open
            ? 'border-brand-500 bg-dark-600 ring-1 ring-brand-500/30'
            : 'border-white/10 bg-dark-700 hover:border-white/20'}`}
      >
        <div className="flex flex-wrap gap-1.5 flex-1">
          {selected.length === 0 ? (
            <span className="text-gray-500 text-sm">{placeholder}</span>
          ) : (
            selected.map(s => (
              <motion.span key={s} initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                className="inline-flex items-center gap-1 bg-brand-600/30 border border-brand-500/40 text-brand-300 text-xs font-medium px-2.5 py-1 rounded-lg">
                {s}
                <button type="button" onClick={(e) => remove(e, s)} className="hover:text-white ml-0.5 transition-colors">
                  <FiX size={10} />
                </button>
              </motion.span>
            ))
          )}
        </div>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <FiChevronDown className="text-gray-400 flex-shrink-0" size={16} />
        </motion.div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 top-full mt-2 w-full bg-dark-700 border border-white/10 rounded-2xl shadow-2xl shadow-black/40 overflow-hidden"
          >
            {options.map((option, i) => {
              const checked = selected.includes(option)
              return (
                <button key={option} type="button" onClick={() => toggle(option)}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 text-sm transition-all duration-150
                    ${i !== 0 ? 'border-t border-white/5' : ''}
                    ${checked ? 'bg-brand-600/20 text-white' : 'text-gray-300 hover:bg-white/5 hover:text-white'}`}
                >
                  <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all duration-150
                    ${checked ? 'bg-brand-600 border-brand-500' : 'border-white/20'}`}>
                    {checked && (
                      <motion.svg initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.15 }}
                        className="w-3 h-3 text-white" fill="none" viewBox="0 0 12 12">
                        <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </motion.svg>
                    )}
                  </div>
                  <span className="font-medium flex-1 text-left">{option}</span>
                  {checked && (
                    <span className="text-brand-400 text-xs bg-brand-600/20 px-2 py-0.5 rounded-full">✓</span>
                  )}
                </button>
              )
            })}
            <div className="px-4 py-2.5 bg-dark-800/80 border-t border-white/5 flex items-center justify-between">
              <p className="text-gray-500 text-xs">
                {selected.length === 0 ? 'Select one or more' : `${selected.length} selected`}
              </p>
              {selected.length > 0 && (
                <button type="button" onClick={() => onChange([])}
                  className="text-xs text-red-400 hover:text-red-300 transition-colors">
                  Clear all
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ── Main Contact ──────────────────────────────────────────────
export default function Contact() {
  const { t } = useTranslation()
  const [form,      setForm]      = useState(initialForm)
  const [errors,    setErrors]    = useState({ fullName: '', email: '', phone: '', courses: '', message: '' })
  const [status,    setStatus]    = useState('idle')
  const [serverMsg, setServerMsg] = useState('')
  const [highlight, setHighlight] = useState(false)

  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  // Pre-select course from course cards
  useEffect(() => {
    const handler = (e) => {
      const title = e.detail
      setForm(prev => ({
        ...prev,
        courses: prev.courses.includes(title) ? prev.courses : [...prev.courses, title],
      }))
      setErrors(prev => ({ ...prev, courses: '' }))
      // flash highlight on the form
      setHighlight(true)
      setTimeout(() => setHighlight(false), 1500)
    }
    window.addEventListener('preselect-course', handler)
    return () => window.removeEventListener('preselect-course', handler)
  }, [])

  const labels        = t('contact.labels',       { returnObjects: true })
  const placeholders  = t('contact.placeholders', { returnObjects: true })
  const errors_t      = t('contact.errors',       { returnObjects: true })
  const success_t     = t('contact.success',      { returnObjects: true })
  const courseOptions = t('courses.list', { returnObjects: true }).map(c => c.title)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { errors: newErrors, valid } = validate(form, errors_t)
    if (!valid) { setErrors(newErrors); return }
    setStatus('loading'); setServerMsg('')
    try {
      const res = await submitContactForm({ ...form, course: form.courses.join(', ') })
      setStatus('success'); setServerMsg(res.message); setForm(initialForm)
    } catch (err) {
      setStatus('error'); setServerMsg(err.message || errors_t.failed)
    }
  }

  const perks = [
    { icon: FiClock,    text: 'Response within 24 hours' },
    { icon: FiBookOpen, text: 'Free course consultation' },
    { icon: FiAward,    text: 'Certified programs' },
  ]

  return (
    <section id="contact" className="section-padding bg-dark-900 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-brand-900/25 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-brand-800/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container-max relative z-10">

        {/* Header */}
        <motion.div ref={ref}
          initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 bg-brand-600/15 border border-brand-500/25 rounded-full px-4 py-1.5 text-brand-400 text-sm font-semibold uppercase tracking-widest mb-4">
            <span className="w-1.5 h-1.5 bg-brand-400 rounded-full animate-pulse" />
            {t('contact.badge')}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-2 mb-4">
            {t('contact.title')}{' '}
            <span className="gradient-text">{t('contact.highlight')}</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">{t('contact.subtitle')}</p>

          {/* Perks row */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            {perks.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 bg-dark-700/60 border border-white/8 rounded-full px-4 py-2">
                <Icon className="text-brand-400" size={14} />
                <span className="text-gray-300 text-sm">{text}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8">

          {/* ── Left sidebar ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2 flex flex-col gap-5"
          >
            {/* Contact info card */}
            <div className="relative glass-card p-6 overflow-hidden">
              {/* Glow accent */}
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-brand-600/15 rounded-full blur-2xl pointer-events-none" />

              <h3 className="text-white font-bold text-lg mb-1 relative">{t('contact.infoTitle')}</h3>
              <p className="text-gray-400 text-sm mb-6 relative">{t('contact.infoSubtitle')}</p>

              <div className="space-y-3 relative">
                {[
                  { icon: FiPhone,  label: 'Phone',    value: '+251 953 703 597',           href: 'tel:+251953703597',                  cta: 'Tap to Call' },
                  { icon: FiMail,   label: 'Email',    value: 'info@infotechtraining.com',  href: 'mailto:info@infotechtraining.com',    cta: 'Send Email'  },
                  { icon: FiMapPin, label: 'Location', value: 'Bale Robe, Bale Goba 04 Kebele', href: 'https://maps.google.com/?q=4294+WQV+Robe+Ethiopia', cta: 'View Map' },
                ].map(({ icon: Icon, label, value, href, cta }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target={label === 'Location' ? '_blank' : '_self'}
                    rel="noopener noreferrer"
                    whileHover={{ x: 4, scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className="flex items-center gap-4 p-3.5 rounded-xl
                      bg-dark-700/50 hover:bg-brand-600/15
                      border border-white/5 hover:border-brand-500/40
                      transition-all duration-200 cursor-pointer group block"
                  >
                    <div className="w-11 h-11 bg-gradient-to-br from-brand-600/30 to-brand-800/20 border border-brand-500/30 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:border-brand-400/60 group-hover:from-brand-600/50 transition-all">
                      <Icon className="text-brand-400" size={18} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-500 text-xs uppercase tracking-wider">{label}</p>
                      <p className="text-white text-sm font-semibold truncate">{value}</p>
                    </div>
                    <span className="text-brand-400 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {cta} →
                    </span>
                  </motion.a>
                ))}
              </div>

              {/* Divider */}
              <div className="my-5 border-t border-white/5" />

              {/* Social links */}
              <p className="text-gray-500 text-xs uppercase tracking-wider mb-3">Follow Us</p>
              <div className="flex gap-2">
                {['Facebook', 'Telegram', 'YouTube', 'Instagram'].map((s) => (
                  <a key={s} href="#"
                    className="flex-1 py-2 text-center text-xs text-gray-400 hover:text-white bg-dark-700 hover:bg-brand-600/30 border border-white/5 hover:border-brand-500/30 rounded-xl transition-all duration-200">
                    {s[0]}
                  </a>
                ))}
              </div>
            </div>

            {/* Map */}
            <div className="glass-card overflow-hidden rounded-2xl flex-1 min-h-[220px] relative">
              <div className="absolute top-3 left-3 z-10 bg-dark-900/80 backdrop-blur-sm border border-white/10 rounded-xl px-3 py-1.5 flex items-center gap-2">
                <FiMapPin className="text-brand-400" size={12} />
                <span className="text-white text-xs font-medium">Bale Robe, Ethiopia</span>
              </div>
              <iframe
                title="Info-Tech Location"
                src="https://www.google.com/maps?q=4294%2BWQV,+Robe,+Ethiopia&output=embed"
                width="100%" height="100%"
                style={{ minHeight: '220px', border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
                allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>

          {/* ── Form ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <motion.div
              animate={highlight ? { boxShadow: '0 0 0 2px #3b82f6, 0 0 40px rgba(59,130,246,0.3)' } : { boxShadow: 'none' }}
              transition={{ duration: 0.4 }}
              className="glass-card p-8 relative overflow-hidden"
            >
              {/* Top accent bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-600 via-brand-400 to-cyan-400 rounded-t-2xl" />

              {status === 'success' ? (
                <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                  className="flex flex-col items-center justify-center py-16 text-center">
                  <motion.div
                    animate={{ scale: [1, 1.15, 1] }} transition={{ repeat: 2, duration: 0.4 }}
                    className="w-20 h-20 bg-green-500/15 border-2 border-green-500/40 rounded-full flex items-center justify-center mb-5">
                    <FiCheckCircle className="text-green-400" size={36} />
                  </motion.div>
                  <h3 className="text-white font-extrabold text-2xl mb-2">{success_t.title}</h3>
                  <p className="text-gray-400 text-sm mb-8 max-w-xs">{serverMsg}</p>
                  <button onClick={() => setStatus('idle')} className="btn-primary px-8">
                    {success_t.again}
                  </button>
                </motion.div>
              ) : (
                <>
                  <div className="mb-6">
                    <h3 className="text-white font-bold text-xl">Send us a message</h3>
                    <p className="text-gray-400 text-sm mt-1">Fill in the form below and we'll get back to you.</p>
                  </div>

                  <form onSubmit={handleSubmit} noValidate className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      {/* Full Name */}
                      <FloatingInput label={labels.fullName} icon={FiUser} error={errors.fullName} required>
                        <input type="text" name="fullName" value={form.fullName} onChange={handleChange}
                          placeholder={placeholders.fullName}
                          className="w-full bg-transparent pr-4 py-3.5 text-white placeholder-gray-500 text-sm focus:outline-none" />
                      </FloatingInput>

                      {/* Email */}
                      <FloatingInput label={labels.email} icon={FiMail} error={errors.email} required>
                        <input type="email" name="email" value={form.email} onChange={handleChange}
                          placeholder={placeholders.email}
                          className="w-full bg-transparent pr-4 py-3.5 text-white placeholder-gray-500 text-sm focus:outline-none" />
                      </FloatingInput>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      {/* Phone */}
                      <FloatingInput label={labels.phone} icon={FiPhone} error={errors.phone} required>
                        <input type="tel" name="phone" value={form.phone} onChange={handleChange}
                          placeholder={placeholders.phone}
                          className="w-full bg-transparent pr-4 py-3.5 text-white placeholder-gray-500 text-sm focus:outline-none" />
                      </FloatingInput>

                      {/* Course multi-select */}
                      <div>
                        <label className="block text-gray-400 text-xs font-medium mb-1.5 uppercase tracking-wider">
                          {labels.course}
                        </label>
                        <CourseMultiSelect
                          options={courseOptions}
                          selected={form.courses}
                          onChange={(sel) => { setForm(p => ({ ...p, courses: sel })); if (errors.courses) setErrors(p => ({ ...p, courses: '' })) }}
                          placeholder={labels.courseDefault}
                          error={errors.courses}
                        />
                        <InputError msg={errors.courses} />
                      </div>
                    </div>

                    {/* Message */}
                    <FloatingInput label={labels.message} icon={FiMessageSquare} error={errors.message} required>
                      <textarea name="message" value={form.message} onChange={handleChange} rows={4}
                        placeholder={placeholders.message}
                        className="w-full bg-transparent pr-4 py-3.5 text-white placeholder-gray-500 text-sm focus:outline-none resize-none" />
                    </FloatingInput>

                    {/* Server error */}
                    {status === 'error' && (
                      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-3 bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3">
                        <FiAlertCircle className="text-red-400 flex-shrink-0" size={18} />
                        <p className="text-red-300 text-sm">{serverMsg}</p>
                      </motion.div>
                    )}

                    {/* Submit */}
                    <button type="submit" disabled={status === 'loading'}
                      className="relative w-full overflow-hidden group bg-gradient-to-r from-brand-600 to-brand-500
                        hover:from-brand-500 hover:to-brand-400 text-white font-bold py-4 rounded-xl
                        flex items-center justify-center gap-2.5 transition-all duration-300
                        hover:shadow-xl hover:shadow-brand-600/30 hover:-translate-y-0.5
                        disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0 text-base"
                    >
                      {/* Shimmer effect */}
                      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

                      {status === 'loading' ? (
                        <>
                          <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}>
                            <FiLoader size={20} />
                          </motion.div>
                          {labels.sending}
                        </>
                      ) : (
                        <>
                          <FiSend size={18} />
                          {labels.send}
                        </>
                      )}
                    </button>

                    <p className="text-center text-gray-600 text-xs">
                      🔒 Your information is safe and will never be shared.
                    </p>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
