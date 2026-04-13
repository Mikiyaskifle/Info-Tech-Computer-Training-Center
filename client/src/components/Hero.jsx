import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiArrowRight, FiPlay, FiUsers, FiAward, FiBookOpen } from 'react-icons/fi'
import { useTranslation } from 'react-i18next'

const slides = [
  { image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1920&q=80', accent: '#60a5fa', accentBg: 'rgba(37,99,235,0.25)', accentBorder: 'rgba(96,165,250,0.4)' },
  { image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1920&q=80', accent: '#c084fc', accentBg: 'rgba(147,51,234,0.25)', accentBorder: 'rgba(192,132,252,0.4)' },
  { image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1920&q=80', accent: '#fb923c', accentBg: 'rgba(234,88,12,0.25)',  accentBorder: 'rgba(251,146,60,0.4)'  },
  { image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=1920&q=80', accent: '#34d399', accentBg: 'rgba(5,150,105,0.25)',   accentBorder: 'rgba(52,211,153,0.4)'  },
  { image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=1920&q=80', accent: '#38bdf8', accentBg: 'rgba(2,132,199,0.25)',   accentBorder: 'rgba(56,189,248,0.4)'  },
]

export default function Hero() {
  const { t } = useTranslation()
  const [current, setCurrent] = useState(0)
  const slide = slides[current]

  useEffect(() => {
    const id = setInterval(() => setCurrent(c => (c + 1) % slides.length), 5000)
    return () => clearInterval(id)
  }, [])

  const handleScroll = (href) => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })

  const stats = [
    { icon: FiUsers,    value: '500+', label: t('hero.stats.students') },
    { icon: FiBookOpen, value: '4',    label: t('hero.stats.courses')  },
    { icon: FiAward,    value: '98%',  label: t('hero.stats.success')  },
  ]

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">

      {/* Slideshow background */}
      <AnimatePresence>
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          className="absolute inset-0 z-0"
        >
          <img src={slide.image} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/65 to-black/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Accent glow */}
      <motion.div
        key={`glow-${current}`}
        animate={{ opacity: [0, 0.18] }}
        transition={{ duration: 1.5 }}
        className="absolute top-1/4 left-1/3 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{ background: slide.accent }}
      />

      {/* Content */}
      <div className="relative z-10 container-max section-padding pt-32 w-full">
        <div className="max-w-3xl">

          {/* Badge */}
          <motion.div
            key={`badge-${current}`}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6 border"
            style={{ background: slide.accentBg, borderColor: slide.accentBorder }}
          >
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: slide.accent }} />
            <span className="text-sm font-medium" style={{ color: slide.accent }}>{t('hero.badge')}</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            key={`h1-${current}`}
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 text-white"
          >
            {t('hero.title')}{' '}
            <motion.span key={`acc-${current}`} animate={{ color: slide.accent }} transition={{ duration: 0.8 }}>
              {t('hero.highlight')}
            </motion.span>{' '}
            {t('hero.titleEnd')}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            key={`sub-${current}`}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
            className="text-gray-200 text-lg sm:text-xl leading-relaxed mb-10 max-w-2xl"
          >
            {t('hero.subtitle')}
          </motion.p>

          {/* CTAs */}
          <motion.div
            key={`cta-${current}`}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-wrap gap-4 mb-16"
          >
            <button
              onClick={() => handleScroll('#courses')}
              className="flex items-center gap-2 text-base px-8 py-3.5 rounded-xl font-semibold text-white transition-all duration-300 hover:-translate-y-0.5"
              style={{ background: slide.accent }}
            >
              {t('hero.explore')} <FiArrowRight />
            </button>
            <button
              onClick={() => handleScroll('#about')}
              className="flex items-center gap-2 text-base px-8 py-3.5 rounded-xl font-semibold text-white border transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/10"
              style={{ borderColor: slide.accent, color: slide.accent }}
            >
              <FiPlay size={16} /> {t('hero.learn')}
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div
            key={`stats-${current}`}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-wrap gap-8"
          >
            {stats.map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center border"
                  style={{ background: slide.accentBg, borderColor: slide.accentBorder }}>
                  <Icon size={18} style={{ color: slide.accent }} />
                </div>
                <div>
                  <div className="text-white font-bold text-xl leading-none">{value}</div>
                  <div className="text-gray-400 text-xs mt-0.5">{label}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Slide dots */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {slides.map((s, i) => (
          <button key={i} onClick={() => setCurrent(i)}
            className="rounded-full transition-all duration-300"
            style={{ width: i === current ? '24px' : '8px', height: '8px', background: i === current ? slide.accent : 'rgba(255,255,255,0.3)' }}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
        <span className="text-gray-400 text-xs">{t('hero.scroll')}</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-0.5 h-8 rounded-full"
          style={{ background: `linear-gradient(to bottom, ${slide.accent}, transparent)` }} />
      </motion.div>
    </section>
  )
}
