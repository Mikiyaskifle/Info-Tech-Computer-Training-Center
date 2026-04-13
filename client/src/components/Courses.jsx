import React from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { FiMonitor, FiCamera, FiVideo, FiPenTool, FiClock, FiUsers, FiArrowRight } from 'react-icons/fi'

const courses = [
  {
    id: 1,
    icon: FiMonitor,
    title: 'Basic Computer',
    duration: '6 Weeks',
    students: '200+ Enrolled',
    level: 'Beginner',
    color: 'from-blue-600 to-blue-400',
    borderHover: 'hover:border-blue-500/40',
    shadowHover: 'hover:shadow-blue-500/10',
    image: 'https://images.unsplash.com/photo-1587614382346-4ec70e388b28?w=600&q=80',
    description:
      'Master the fundamentals of computing — from operating systems and file management to Microsoft Office and essential productivity tools used in every workplace.',
    topics: ['Windows OS & File Management', 'Microsoft Word, Excel & PowerPoint', 'Internet & Email Essentials', 'Typing & Data Entry'],
  },
  {
    id: 2,
    icon: FiCamera,
    title: 'Photography',
    duration: '8 Weeks',
    students: '120+ Enrolled',
    level: 'Beginner–Intermediate',
    color: 'from-purple-600 to-purple-400',
    borderHover: 'hover:border-purple-500/40',
    shadowHover: 'hover:shadow-purple-500/10',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&q=80',
    description:
      'Learn professional photography from camera basics to advanced composition. Covers DSLR operation, lighting, portrait, landscape, and post-processing with Adobe Lightroom.',
    topics: ['Camera Settings & Controls', 'Composition & Lighting', 'Portrait & Landscape', 'Adobe Lightroom Editing'],
  },
  {
    id: 3,
    icon: FiVideo,
    title: 'Videography',
    duration: '10 Weeks',
    students: '90+ Enrolled',
    level: 'Beginner–Advanced',
    color: 'from-red-600 to-orange-400',
    borderHover: 'hover:border-red-500/40',
    shadowHover: 'hover:shadow-red-500/10',
    image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&q=80',
    description:
      'From shooting to final cut — learn professional video production, storytelling, camera movement, audio recording, and editing with Adobe Premiere Pro and DaVinci Resolve.',
    topics: ['Video Production Basics', 'Storytelling & Scripting', 'Audio & Lighting Setup', 'Premiere Pro & DaVinci Resolve'],
  },
  {
    id: 4,
    icon: FiPenTool,
    title: 'Graphic Design',
    duration: '12 Weeks',
    students: '150+ Enrolled',
    level: 'Beginner–Advanced',
    color: 'from-green-600 to-teal-400',
    borderHover: 'hover:border-green-500/40',
    shadowHover: 'hover:shadow-green-500/10',
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&q=80',
    description:
      'Develop a strong design foundation covering typography, color theory, branding, and layout. Master Adobe Photoshop, Illustrator, and InDesign to create stunning visual content.',
    topics: ['Design Principles & Color Theory', 'Adobe Photoshop & Illustrator', 'Logo & Brand Identity', 'Print & Digital Layout'],
  },
]

function CourseCard({ course, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const Icon = course.icon

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12, ease: 'easeOut' }}
    >
      <motion.div
        whileHover={{ y: -8 }}
        transition={{ type: 'spring', stiffness: 250, damping: 20 }}
        className={`group glass-card overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-2xl ${course.borderHover} ${course.shadowHover}`}
      >
        {/* Card image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 to-transparent" />
          <div className={`absolute top-4 left-4 w-10 h-10 bg-gradient-to-br ${course.color} rounded-xl flex items-center justify-center shadow-lg`}>
            <Icon className="text-white" size={18} />
          </div>
          <div className="absolute top-4 right-4 bg-dark-900/70 backdrop-blur-sm border border-white/10 rounded-full px-3 py-1">
            <span className="text-xs text-gray-300 font-medium">{course.level}</span>
          </div>
        </div>

        {/* Card body */}
        <div className="p-6 flex flex-col flex-1">
          <h3 className="text-white font-bold text-xl mb-2">{course.title}</h3>
          <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-1">{course.description}</p>

          <ul className="space-y-1.5 mb-5">
            {course.topics.map((topic) => (
              <li key={topic} className="flex items-center gap-2 text-gray-300 text-xs">
                <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${course.color} flex-shrink-0`} />
                {topic}
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4 mb-5 pt-4 border-t border-white/5">
            <div className="flex items-center gap-1.5 text-gray-400 text-xs">
              <FiClock size={13} /> {course.duration}
            </div>
            <div className="flex items-center gap-1.5 text-gray-400 text-xs">
              <FiUsers size={13} /> {course.students}
            </div>
          </div>

          <button
            onClick={() => document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' })}
            className={`w-full bg-gradient-to-r ${course.color} text-white font-semibold py-2.5 rounded-xl
              flex items-center justify-center gap-2 opacity-90 hover:opacity-100
              hover:shadow-lg transition-all duration-300 text-sm`}
          >
            Enroll Now <FiArrowRight size={15} />
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Courses() {
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-60px' })

  return (
    <section id="courses" className="section-padding bg-dark-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-900/20 via-transparent to-transparent pointer-events-none" />

      <div className="container-max relative z-10">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-brand-400 text-sm font-semibold uppercase tracking-widest">Our Programs</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-4">
            Courses Designed for{' '}
            <span className="gradient-text">Real-World Success</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Choose from our professionally crafted programs and gain skills that employers are actively looking for.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map((course, i) => (
            <CourseCard key={course.id} course={course} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
