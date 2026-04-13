import React, { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  FiMonitor, FiCamera, FiVideo, FiPenTool,
  FiClock, FiUsers, FiArrowRight, FiX,
  FiCheckCircle, FiBookOpen, FiStar
} from 'react-icons/fi'
import { useTranslation } from 'react-i18next'

const courseStyles = [
  { icon: FiMonitor,  color: 'from-blue-600 to-blue-400',     border: 'hover:border-blue-500/40',   glow: 'shadow-blue-500/20',   image: 'https://images.unsplash.com/photo-1587614382346-4ec70e388b28?w=800&q=80' },
  { icon: FiCamera,   color: 'from-purple-600 to-purple-400', border: 'hover:border-purple-500/40', glow: 'shadow-purple-500/20', image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80' },
  { icon: FiVideo,    color: 'from-red-600 to-orange-400',    border: 'hover:border-red-500/40',    glow: 'shadow-red-500/20',    image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&q=80' },
  { icon: FiPenTool,  color: 'from-green-600 to-teal-400',    border: 'hover:border-green-500/40',  glow: 'shadow-green-500/20',  image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&q=80' },
]

// ── Course Detail Modal ───────────────────────────────────────
function CourseModal({ course, style, onClose, onEnroll }) {
  const { t } = useTranslation()
  const Icon = style.icon

  // close on backdrop click
  const handleBackdrop = (e) => { if (e.target === e.currentTarget) onClose() }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleBackdrop}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 30 }}
          transition={{ type: 'spring', stiffness: 280, damping: 25 }}
          className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-dark-800 border border-white/10 rounded-2xl shadow-2xl"
        >
          {/* Hero image */}
          <div className="relative h-52 overflow-hidden rounded-t-2xl">
            <img src={style.image} alt={course.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-800 via-dark-800/40 to-transparent" />

            {/* Icon + level */}
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <div className={`w-10 h-10 bg-gradient-to-br ${style.color} rounded-xl flex items-center justify-center shadow-lg`}>
                <Icon className="text-white" size={18} />
              </div>
              <span className="bg-dark-900/70 backdrop-blur-sm border border-white/10 rounded-full px-3 py-1 text-xs text-gray-300 font-medium">
                {course.level}
              </span>
            </div>

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-9 h-9 bg-dark-900/70 backdrop-blur-sm border border-white/10 rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:bg-dark-700 transition-all"
            >
              <FiX size={18} />
            </button>

            {/* Title over image */}
            <div className="absolute bottom-4 left-6">
              <h2 className="text-white font-extrabold text-2xl">{course.title}</h2>
            </div>
          </div>

          {/* Body */}
          <div className="p-6 space-y-6">

            {/* Stats row */}
            <div className="flex flex-wrap gap-4">
              {[
                { icon: FiClock,    val: course.duration },
                { icon: FiUsers,    val: course.students },
                { icon: FiBookOpen, val: course.level    },
                { icon: FiStar,     val: '4.9 / 5'       },
              ].map(({ icon: I, val }) => (
                <div key={val} className="flex items-center gap-2 bg-dark-700 border border-white/5 rounded-xl px-4 py-2">
                  <I className="text-brand-400" size={14} />
                  <span className="text-gray-300 text-sm font-medium">{val}</span>
                </div>
              ))}
            </div>

            {/* Description */}
            <div>
              <p className="text-gray-300 text-sm leading-relaxed">{course.description}</p>
            </div>

            {/* What you'll learn */}
            <div>
              <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                <FiCheckCircle className="text-brand-400" size={16} />
                {t('courses.whatYouLearn')}
              </h4>
              <div className="grid sm:grid-cols-2 gap-2">
                {course.topics.map((topic, i) => (
                  <div key={i} className="flex items-start gap-2.5 bg-dark-700/60 border border-white/5 rounded-xl px-4 py-3">
                    <span className={`w-2 h-2 rounded-full bg-gradient-to-r ${style.color} flex-shrink-0 mt-1`} />
                    <span className="text-gray-300 text-sm">{topic}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA button */}
            <button
              onClick={() => { onClose(); onEnroll(course.title) }}
              className={`w-full bg-gradient-to-r ${style.color} text-white font-bold py-4 rounded-xl
                flex items-center justify-center gap-2 hover:shadow-xl hover:opacity-95
                transition-all duration-300 text-base hover:-translate-y-0.5`}
            >
              {t('courses.enrollCourse')} <FiArrowRight size={18} />
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

// ── Course Card ───────────────────────────────────────────────
function CourseCard({ course, style, index, onLearnMore, onEnroll }) {
  const { t } = useTranslation()
  const ref   = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const Icon  = style.icon

  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12 }}
    >
      <motion.div
        whileHover={{ y: -8 }}
        transition={{ type: 'spring', stiffness: 250, damping: 20 }}
        className={`group glass-card overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-2xl ${style.border} ${style.glow}`}
      >
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <img src={style.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 to-transparent" />
          <div className={`absolute top-4 left-4 w-10 h-10 bg-gradient-to-br ${style.color} rounded-xl flex items-center justify-center shadow-lg`}>
            <Icon className="text-white" size={18} />
          </div>
          <div className="absolute top-4 right-4 bg-dark-900/70 backdrop-blur-sm border border-white/10 rounded-full px-3 py-1">
            <span className="text-xs text-gray-300 font-medium">{course.level}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-1">
          <h3 className="text-white font-bold text-xl mb-2">{course.title}</h3>
          <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-1 line-clamp-3">{course.description}</p>

          <ul className="space-y-1.5 mb-5">
            {course.topics.map((topic, i) => (
              <li key={i} className="flex items-center gap-2 text-gray-300 text-xs">
                <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${style.color} flex-shrink-0`} />
                {topic}
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4 mb-5 pt-4 border-t border-white/5">
            <div className="flex items-center gap-1.5 text-gray-400 text-xs"><FiClock size={13} /> {course.duration}</div>
            <div className="flex items-center gap-1.5 text-gray-400 text-xs"><FiUsers size={13} /> {course.students}</div>
          </div>

          {/* Two buttons */}
          <div className="flex gap-2">
            {/* Learn More → opens modal */}
            <button
              onClick={() => onLearnMore(index)}
              className="flex-1 border border-white/15 text-gray-300 hover:text-white hover:border-white/30 hover:bg-white/5
                font-semibold py-2.5 rounded-xl text-sm transition-all duration-200"
            >
              {t('courses.learnMore')}
            </button>
            {/* Enroll Now → directly to contact */}
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={() => onEnroll(course.title)}
              className={`flex-1 bg-gradient-to-r ${style.color} text-white font-semibold py-2.5 rounded-xl
                flex items-center justify-center gap-1.5 opacity-90 hover:opacity-100
                hover:shadow-lg transition-all duration-300 text-sm`}
            >
              {t('courses.enroll')} <FiArrowRight size={14} />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ── Main Section ──────────────────────────────────────────────
export default function Courses() {
  const { t } = useTranslation()
  const headerRef  = useRef(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-60px' })
  const courseList = t('courses.list', { returnObjects: true })

  const [modalIndex, setModalIndex] = useState(null)

  const handleEnroll = (courseTitle) => {
    // Pre-select course in contact form via URL hash + custom event
    window.dispatchEvent(new CustomEvent('preselect-course', { detail: courseTitle }))
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="courses" className="section-padding bg-dark-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-900/20 via-transparent to-transparent pointer-events-none" />

      <div className="container-max relative z-10">
        <motion.div ref={headerRef}
          initial={{ opacity: 0, y: 30 }} animate={headerInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-brand-400 text-sm font-semibold uppercase tracking-widest">{t('courses.badge')}</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-4">
            {t('courses.title')}{' '}
            <span className="gradient-text">{t('courses.highlight')}</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">{t('courses.subtitle')}</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {courseList.map((course, i) => (
            <CourseCard
              key={i}
              course={course}
              style={courseStyles[i]}
              index={i}
              onLearnMore={setModalIndex}
              onEnroll={handleEnroll}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modalIndex !== null && (
          <CourseModal
            course={courseList[modalIndex]}
            style={courseStyles[modalIndex]}
            onClose={() => setModalIndex(null)}
            onEnroll={handleEnroll}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
