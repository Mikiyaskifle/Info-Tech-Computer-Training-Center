import React from 'react'
import { motion } from 'framer-motion'
import { FiMonitor, FiPhone, FiMail, FiMapPin, FiFacebook, FiInstagram, FiTwitter, FiYoutube } from 'react-icons/fi'

const quickLinks = ['Home', 'About', 'Courses', 'Contact']
const courses = ['Basic Computer', 'Photography', 'Videography', 'Graphic Design']

const socials = [
  { icon: FiFacebook, href: '#', label: 'Facebook' },
  { icon: FiInstagram, href: '#', label: 'Instagram' },
  { icon: FiTwitter, href: '#', label: 'Twitter' },
  { icon: FiYoutube, href: '#', label: 'YouTube' },
]

export default function Footer() {
  const handleNav = (section) => {
    const el = document.querySelector(`#${section.toLowerCase()}`)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="bg-dark-800 border-t border-white/5">
      <div className="container-max px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-brand-600 rounded-lg flex items-center justify-center">
                <FiMonitor className="text-white text-lg" />
              </div>
              <div>
                <span className="block text-white font-bold text-sm">Info-Tech</span>
                <span className="block text-brand-400 text-xs">Training Center</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-5">
              Empowering individuals with digital skills for a better future. Quality IT education in the heart of Addis Ababa.
            </p>
            <div className="flex gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 bg-dark-600 border border-white/10 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-brand-600 hover:border-brand-500 transition-all duration-200"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link}>
                  <button
                    onClick={() => handleNav(link)}
                    className="text-gray-400 hover:text-brand-400 text-sm transition-colors duration-200"
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Courses */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Our Courses</h4>
            <ul className="space-y-2.5">
              {courses.map((course) => (
                <li key={course}>
                  <button
                    onClick={() => handleNav('courses')}
                    className="text-gray-400 hover:text-brand-400 text-sm transition-colors duration-200"
                  >
                    {course}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Contact Us</h4>
            <ul className="space-y-3">
              {[
                { icon: FiPhone, text: '+251 911 000 000' },
                { icon: FiMail, text: 'info@infotechtraining.com' },
                { icon: FiMapPin, text: 'Addis Ababa, Ethiopia' },
              ].map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-start gap-3">
                  <Icon className="text-brand-400 mt-0.5 flex-shrink-0" size={15} />
                  <span className="text-gray-400 text-sm">{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Info-Tech Computer Training Center. All rights reserved.
          </p>
          <p className="text-gray-600 text-xs">
            General Manager: <span className="text-gray-400">Andualem Kebebe</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
