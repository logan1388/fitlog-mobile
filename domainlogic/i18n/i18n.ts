// Copyright FitBook

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import USEnglish from './en-us.json';

const resources = {
  'en-US': { translation: USEnglish },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en-US',
  debug: false,
  keySeparator: '.',
  interpolation: {
    escapeValue: true,
  },
});

export default i18n;
