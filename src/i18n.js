

import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

// Import your translation files
import en from './components/en.json';
import fa from './components/fa.json';

const messages = {
  en,
  fa,
};

const i18n = new VueI18n({
  locale: 'en', // Set the default locale
  fallbackLocale: 'en', // Fallback to English if translation not found
  messages,
});

export default i18n;
