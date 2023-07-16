import './styles/style.scss'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'

import { createApp } from 'vue'

import App from './App.vue'
const app = createApp(App)

import { createPinia } from 'pinia'
app.use(createPinia())

import router from './router'
app.use(router)

import { createI18n } from 'vue-i18n'
import i18nMessages from './locales/messages.json'
const i18n = createI18n({
  // legacy: false,
  // globalInjection: true,
  locale: window.navigator.language.substring(0,2).toLowerCase(),
  fallbackLocale: 'en',
  messages: i18nMessages
})
app.use(i18n)

app.mount('#app')
