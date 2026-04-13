import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './en'
import am from './am'
import or from './or'

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    am: { translation: am },
    or: { translation: or },
  },
  lng: localStorage.getItem('lang') || 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
})

export default i18n
