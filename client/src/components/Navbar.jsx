import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMenu, FiX, FiMonitor, FiGlobe } from 'react-icons/fi'
import { useTranslation } from 'react-i18next'

const languages = [
  { code: 'en', label: 'English',  flag: '🇬🇧' },
  { code: 'am', label: 'አማርኛ',    flag: '🇪🇹' },
  { code: 'or', label: 'Oromoo',   flag: '🇪🇹' },
]

export default function Navbar() {
  const { t, i18n } = useTranslation()
  const [scrolled,   setScrolled]   = useState(false)
  const [menuOpen,   setMenuOpen]   = useState(false)
  const [langOpen,   setLangOpen]   = useState(false)

  const currentLang = languages.find(l => l.code === i18n.language) || languages[0]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // close lang dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (!e.target.closest('#lang-menu')) setLangOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleNav = (href) => {
    setMenuOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  const switchLang = (code) => {
    i18n.changeLanguage(code)
    localStorage.setItem('lang', code)
    setLangOpen(false)
  }

  const navLinks = [
    { label: t('nav.home'),    href: '#home'    },
    { label: t('nav.about'),   href: '#about'   },
    { label: t('nav.courses'), href: '#courses' },
    { label: t('nav.contact'), href: '#contact' },
  ]

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-dark-800/95 backdrop-blur-md shadow-lg shadow-black/30 border-b border-white/5' : 'bg-transparent'
      }`}
    >
      <div className="container-max px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Logo */}
          <button onClick={() => handleNav('#home')} className="flex items-center gap-3 group">
            {/* Icon box with gradient + glow */}
            <div className="relative w-11 h-11 flex-shrink-0">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-400 to-brand-700 rounded-xl shadow-lg shadow-brand-600/50 group-hover:shadow-brand-500/70 transition-all duration-300 group-hover:scale-105" />
              <div className="absolute inset-0 flex items-center justify-center">
                <FiMonitor className="text-white drop-shadow" size={20} />
              </div>
              {/* Animated ping dot */}
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-60" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-300" />
              </span>
            </div>

            {/* Text */}
            <div className="leading-none">
              <div className="flex items-baseline gap-1">
                <span className="text-white font-extrabold text-lg tracking-tight">Info</span>
                <span className="text-lg font-extrabold tracking-tight bg-gradient-to-r from-brand-400 to-cyan-400 bg-clip-text text-transparent">-Tech</span>
              </div>
              <div className="flex items-center gap-1 mt-0.5">
                <span className="w-3 h-px bg-gradient-to-r from-brand-400 to-transparent" />
                <span className="text-[10px] font-semibold tracking-[0.18em] text-gray-400 uppercase">
                  Training Center
                </span>
                <span className="w-3 h-px bg-gradient-to-l from-brand-400 to-transparent" />
              </div>
            </div>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNav(link.href)}
                className="px-4 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200 text-sm font-medium"
              >
                {link.label}
              </button>
            ))}

            {/* Language switcher */}
            <div id="lang-menu" className="relative ml-2">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1.5 px-3 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all text-sm font-medium"
              >
                <FiGlobe size={15} />
                <span>{currentLang.flag} {currentLang.code.toUpperCase()}</span>
              </button>
              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-1 bg-dark-700 border border-white/10 rounded-xl overflow-hidden shadow-xl min-w-[140px]"
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => switchLang(lang.code)}
                        className={`w-full flex items-center gap-2 px-4 py-2.5 text-sm transition-colors
                          ${i18n.language === lang.code
                            ? 'bg-brand-600/30 text-brand-300 font-semibold'
                            : 'text-gray-300 hover:bg-white/5 hover:text-white'}`}
                      >
                        <span>{lang.flag}</span>
                        <span>{lang.label}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button onClick={() => handleNav('#contact')} className="ml-2 btn-primary text-sm py-2">
              {t('nav.enroll')}
            </button>
          </nav>

          {/* Mobile right side */}
          <div className="md:hidden flex items-center gap-2">
            {/* Mobile lang switcher */}
            <div id="lang-menu" className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors text-sm"
              >
                {currentLang.flag}
              </button>
              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-1 bg-dark-700 border border-white/10 rounded-xl overflow-hidden shadow-xl min-w-[130px] z-50"
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => switchLang(lang.code)}
                        className={`w-full flex items-center gap-2 px-4 py-2.5 text-sm transition-colors
                          ${i18n.language === lang.code
                            ? 'bg-brand-600/30 text-brand-300 font-semibold'
                            : 'text-gray-300 hover:bg-white/5 hover:text-white'}`}
                      >
                        <span>{lang.flag}</span>
                        <span>{lang.label}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-dark-800/98 backdrop-blur-md border-t border-white/5"
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNav(link.href)}
                  className="text-left px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all text-sm font-medium"
                >
                  {link.label}
                </button>
              ))}
              <button onClick={() => handleNav('#contact')} className="mt-2 btn-primary text-sm text-center">
                {t('nav.enroll')}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
