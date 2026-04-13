import React from 'react'
import { motion } from 'framer-motion'
import { FiArrowRight, FiPlay, FiUsers, FiAward, FiBookOpen } from 'react-icons/fi'

const stats = [
  { icon: FiUsers, value: '500+', label: 'Students Trained' },
  { icon: FiBookOpen, value: '4', label: 'Expert Courses' },
  { icon: FiAward, value: '98%', label: 'Success Rate' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.15, ease: 'easeOut' },
  }),
}

export default function Hero() {
  const handleScroll = (href) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1920&q=80"
          alt="Computer training background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-dark-900/97 via-dark-900/85 to-dark-900/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent" />
      </div>

      {/* Animated glow orbs */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-brand-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-brand-400/8 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 container-max section-padding pt-32">
        <div className="max-w-3xl">
          {/* Badge */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
            className="inline-flex items-center gap-2 bg-brand-600/20 border border-brand-500/30 rounded-full px-4 py-1.5 mb-6"
          >
            <span className="w-2 h-2 bg-brand-400 rounded-full animate-pulse" />
            <span className="text-brand-300 text-sm font-medium">Now Enrolling — Limited Seats</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6"
          >
            Master Digital Skills at{' '}
            <span className="gradient-text">Info-Tech</span>{' '}
            Training Center
          </motion.h1>

          {/* Subtext */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
            className="text-gray-300 text-lg sm:text-xl leading-relaxed mb-10 max-w-2xl"
          >
            Professional training in Computer Basics, Photography, Videography, and Graphic Design.
            Build real-world skills with expert instructors and hands-on practice.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={3}
            className="flex flex-wrap gap-4 mb-16"
          >
            <button
              onClick={() => handleScroll('#courses')}
              className="btn-primary flex items-center gap-2 text-base px-8 py-3.5"
            >
              Explore Courses <FiArrowRight />
            </button>
            <button
              onClick={() => handleScroll('#about')}
              className="btn-outline flex items-center gap-2 text-base px-8 py-3.5"
            >
              <FiPlay size={16} /> Learn More
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={4}
            className="flex flex-wrap gap-8"
          >
            {stats.map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="w-10 h-10 bg-brand-600/20 border border-brand-500/30 rounded-xl flex items-center justify-center">
                  <Icon className="text-brand-400" size={18} />
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

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
      >
        <span className="text-gray-500 text-xs">Scroll down</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-0.5 h-8 bg-gradient-to-b from-brand-500 to-transparent rounded-full"
        />
      </motion.div>
    </section>
  )
}
