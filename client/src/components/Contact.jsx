import React, { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FiSend, FiCheckCircle, FiAlertCircle, FiPhone, FiMail, FiMapPin, FiLoader } from 'react-icons/fi'
import { submitContactForm } from '../services/contactApi'

const courseOptions = [
  'Basic Computer',
  'Photography',
  'Videography',
  'Graphic Design',
]

const contactInfo = [
  { icon: FiPhone, label: 'Phone', value: '+251 911 000 000' },
  { icon: FiMail, label: 'Email', value: 'info@infotechtraining.com' },
  { icon: FiMapPin, label: 'Location', value: 'Addis Ababa, Ethiopia' },
]

const initialForm = { fullName: '', email: '', phone: '', course: '', message: '' }
const initialErrors = { fullName: '', email: '', phone: '', course: '', message: '' }

function validate(form) {
  const errors = { ...initialErrors }
  let valid = true

  if (!form.fullName.trim() || form.fullName.trim().length < 2) {
    errors.fullName = 'Full name must be at least 2 characters.'
    valid = false
  }
  if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Please enter a valid email address.'
    valid = false
  }
  if (!form.phone.trim() || !/^\+?[\d\s\-()]{7,15}$/.test(form.phone)) {
    errors.phone = 'Please enter a valid phone number.'
    valid = false
  }
  if (!form.course) {
    errors.course = 'Please select a course.'
    valid = false
  }
  if (!form.message.trim() || form.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters.'
    valid = false
  }

  return { errors, valid }
}

function InputError({ msg }) {
  if (!msg) return null
  return (
    <p className="mt-1 text-red-400 text-xs flex items-center gap-1">
      <FiAlertCircle size={12} /> {msg}
    </p>
  )
}

export default function Contact() {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState(initialErrors)
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [serverMsg, setServerMsg] = useState('')

  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { errors: newErrors, valid } = validate(form)
    if (!valid) { setErrors(newErrors); return }

    setStatus('loading')
    setServerMsg('')

    try {
      const res = await submitContactForm(form)
      setStatus('success')
      setServerMsg(res.message || 'Your message was sent successfully!')
      setForm(initialForm)
    } catch (err) {
      setStatus('error')
      setServerMsg(err.message || 'Failed to send. Please try again.')
    }
  }

  return (
    <section id="contact" className="section-padding bg-dark-800 relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-brand-900/20 to-transparent pointer-events-none" />

      <div className="container-max relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-brand-400 text-sm font-semibold uppercase tracking-widest">Get In Touch</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-4">
            Ready to Start Your{' '}
            <span className="gradient-text">Learning Journey?</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Fill out the form below and our team will get back to you within 24 hours.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Contact info sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2 flex flex-col gap-6"
          >
            <div className="glass-card p-6">
              <h3 className="text-white font-bold text-lg mb-1">Contact Information</h3>
              <p className="text-gray-400 text-sm mb-6">Reach us through any of these channels.</p>
              <div className="space-y-5">
                {contactInfo.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-brand-600/20 border border-brand-500/30 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon className="text-brand-400" size={17} />
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs">{label}</p>
                      <p className="text-white text-sm font-medium">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Map / image placeholder */}
            <div className="glass-card overflow-hidden rounded-2xl flex-1 min-h-[180px]">
              <img
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=600&q=80"
                alt="Addis Ababa location"
                className="w-full h-full object-cover opacity-60"
              />
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className="glass-card p-8">
              {status === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <div className="w-16 h-16 bg-green-500/20 border border-green-500/30 rounded-full flex items-center justify-center mb-4">
                    <FiCheckCircle className="text-green-400" size={32} />
                  </div>
                  <h3 className="text-white font-bold text-xl mb-2">Message Sent!</h3>
                  <p className="text-gray-400 text-sm mb-6">{serverMsg}</p>
                  <button onClick={() => setStatus('idle')} className="btn-primary text-sm">
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    {/* Full Name */}
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-1.5">
                        Full Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={form.fullName}
                        onChange={handleChange}
                        placeholder="Andualem Kebebe"
                        className={`input-field ${errors.fullName ? 'border-red-500/60' : ''}`}
                      />
                      <InputError msg={errors.fullName} />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-1.5">
                        Email Address <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        className={`input-field ${errors.email ? 'border-red-500/60' : ''}`}
                      />
                      <InputError msg={errors.email} />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    {/* Phone */}
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-1.5">
                        Phone Number <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+251 911 000 000"
                        className={`input-field ${errors.phone ? 'border-red-500/60' : ''}`}
                      />
                      <InputError msg={errors.phone} />
                    </div>

                    {/* Course */}
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-1.5">
                        Select Course <span className="text-red-400">*</span>
                      </label>
                      <select
                        name="course"
                        value={form.course}
                        onChange={handleChange}
                        className={`input-field ${errors.course ? 'border-red-500/60' : ''}`}
                      >
                        <option value="">-- Choose a course --</option>
                        {courseOptions.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                      <InputError msg={errors.course} />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-1.5">
                      Message <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Tell us about your goals or any questions you have..."
                      className={`input-field resize-none ${errors.message ? 'border-red-500/60' : ''}`}
                    />
                    <InputError msg={errors.message} />
                  </div>

                  {/* Server error */}
                  {status === 'error' && (
                    <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3">
                      <FiAlertCircle className="text-red-400 flex-shrink-0" />
                      <p className="text-red-300 text-sm">{serverMsg}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="btn-primary w-full flex items-center justify-center gap-2 py-3.5 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === 'loading' ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
                        >
                          <FiLoader size={18} />
                        </motion.div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <FiSend size={16} /> Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
