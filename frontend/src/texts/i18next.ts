import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import resources from './locales/index';

i18next.use(initReactI18next).init({
  lng: 'ru',
  resources,
  interpolation: {
    escapeValue: false
  }
});

export default i18next.t;
