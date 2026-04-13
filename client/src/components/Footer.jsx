import React from 'react'
import { FiMonitor, FiPhone, FiMail, FiMapPin, FiFacebook, FiInstagram, FiTwitter, FiYoutube } from 'react-icons/fi'
import { useTranslation } from 'react-i18next'

const socials = [
  { icon: FiFacebook,  href: '#', label: 'Facebook'  },
  { icon: FiInstagram, href: '#', label: 'Instagram' },
  { icon: FiTwitter,   href: '#', label: 'Twitter'   },
  { icon: FiYoutube,   href: '#', label: 'YouTube'   },
]

export default function Footer() {
  const { t } = useTranslation()

  const handleNav = (section) => {
    document.querySelector(`#${section}`)?.scrollIntoView({ behavior: 'smooth' })
  }

  const quickLinks = [
    { label: t('nav.home'),    id: 'home'    },
    { label: t('nav.about'),   id: 'about'   },
    { label: t('nav.courses'), id: 'courses' },
    { label: t('nav.contact'), id: 'contact' },
  ]

  const courseList = t('courses.list', { returnObjects: true })

  return (
    <footer className="bg-dark-800 border-t border-white/5">
      <div className="container-max px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-11 h-11 flex-shrink-0">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-400 to-brand-700 rounded-xl shadow-lg shadow-brand-600/40" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <FiMonitor className="text-white" size={20} />
                </div>
              </div>
              <div className="leading-none">
                <div className="flex items-baseline gap-1">
                  <span className="text-white font-extrabold text-lg tracking-tight">Info</span>
                  <span className="text-lg font-extrabold tracking-tight bg-gradient-to-r from-brand-400 to-cyan-400 bg-clip-text text-transparent">-Tech</span>
                </div>
                <div className="flex items-center gap-1 mt-0.5">
                  <span className="w-3 h-px bg-gradient-to-r from-brand-400 to-transparent" />
                  <span className="text-[10px] font-semibold tracking-[0.18em] text-gray-400 uppercase">Training Center</span>
                  <span className="w-3 h-px bg-gradient-to-l from-brand-400 to-transparent" />
                </div>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-5">{t('footer.desc')}</p>
            <div className="flex gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} aria-label={label}
                  className="w-9 h-9 bg-dark-600 border border-white/10 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-brand-600 hover:border-brand-500 transition-all duration-200">
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">{t('footer.quickLinks')}</h4>
            <ul className="space-y-2.5">
              {quickLinks.map(link => (
                <li key={link.id}>
                  <button onClick={() => handleNav(link.id)}
                    className="text-gray-400 hover:text-brand-400 text-sm transition-colors duration-200">
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Courses */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">{t('footer.ourCourses')}</h4>
            <ul className="space-y-2.5">
              {courseList.map(c => (
                <li key={c.title}>
                  <button onClick={() => handleNav('courses')}
                    className="text-gray-400 hover:text-brand-400 text-sm transition-colors duration-200">
                    {c.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">{t('footer.contactUs')}</h4>
            <ul className="space-y-3">
              {[
                { icon: FiPhone,  text: '+251 953 703 597' },
                { icon: FiMail,   text: 'info@infotechtraining.com' },
                { icon: FiMapPin, text: 'Bale Robe, Bale Goba 04 Kebele' },
              ].map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-start gap-3">
                  <Icon className="text-brand-400 mt-0.5 flex-shrink-0" size={15} />
                  <span className="text-gray-400 text-sm">{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Info-Tech Computer Training Center. {t('footer.rights')}
          </p>
          <p className="text-gray-600 text-xs">
            {t('footer.gm')}: <span className="text-gray-400">Andualem Kebebe</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
