import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FiCheckCircle, FiTarget, FiTrendingUp, FiShield } from 'react-icons/fi'
import { useTranslation } from 'react-i18next'

const valueIcons = [FiTarget, FiTrendingUp, FiShield, FiCheckCircle]

function AnimatedSection({ children, className = '', delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default function About() {
  const { t } = useTranslation()
  const values    = t('about.values',    { returnObjects: true })
  const highlights = t('about.highlights', { returnObjects: true })

  return (
    <section id="about" className="section-padding bg-dark-800 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-900/10 to-transparent pointer-events-none" />

      <div className="container-max relative z-10">

        {/* Header */}
        <AnimatedSection className="text-center mb-16">
          <span className="text-brand-400 text-sm font-semibold uppercase tracking-widest">{t('about.badge')}</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-4">
            {t('about.title')}{' '}
            <span className="gradient-text">{t('about.highlight')}</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">{t('about.subtitle')}</p>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">

          {/* GM Photo */}
          <AnimatedSection delay={0.1}>
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/5] max-w-sm mx-auto lg:mx-0">
                <img
                  src="/images/andualem.jpg"
                  alt="Andualem Kebebe - General Manager"
                  className="w-full h-full object-cover object-top"
                  onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=80' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900/90 via-dark-900/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="glass-card p-4">
                    <h3 className="text-white font-bold text-lg">Andualem Kebebe</h3>
                    <p className="text-brand-400 text-sm font-medium mb-2">{t('about.gmRole')}</p>
                    <p className="text-gray-300 text-xs leading-relaxed">{t('about.gmDesc')}</p>
                  </div>
                </div>
              </div>
              <motion.div
                animate={{ y: [-4, 4, -4] }}
                transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                className="absolute -top-4 -right-4 lg:right-8 bg-brand-600 rounded-2xl p-4 shadow-xl shadow-brand-600/30"
              >
                <div className="text-white text-center">
                  <div className="text-2xl font-extrabold">10+</div>
                  <div className="text-xs font-medium opacity-90">{t('about.yearsExp')}</div>
                </div>
              </motion.div>
            </div>
          </AnimatedSection>

          {/* GM Message */}
          <AnimatedSection delay={0.2}>
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">{t('about.gmTitle')}</h3>
              <blockquote className="border-l-4 border-brand-500 pl-5 mb-6">
                <p className="text-gray-300 text-base leading-relaxed italic">{t('about.gmQuote')}</p>
                <footer className="mt-3 text-brand-400 font-semibold text-sm">{t('about.gmBy')}</footer>
              </blockquote>
              <ul className="space-y-3 mb-8">
                {highlights.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-300 text-sm">
                    <FiCheckCircle className="text-brand-400 mt-0.5 flex-shrink-0" size={16} />
                    {item}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' })}
                className="btn-primary"
              >
                {t('about.cta')}
              </button>
            </div>
          </AnimatedSection>
        </div>

        {/* Values */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => {
            const Icon = valueIcons[i]
            return (
              <AnimatedSection key={i} delay={i * 0.1}>
                <motion.div whileHover={{ y: -6, scale: 1.02 }} transition={{ type: 'spring', stiffness: 300 }}
                  className="glass-card p-6 h-full">
                  <div className="w-12 h-12 bg-brand-600/20 border border-brand-500/30 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="text-brand-400" size={22} />
                  </div>
                  <h4 className="text-white font-semibold mb-2">{v.title}</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">{v.desc}</p>
                </motion.div>
              </AnimatedSection>
            )
          })}
        </div>
      </div>
    </section>
  )
}
