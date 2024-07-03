import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { es } from 'vuetify/locale'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'
import dayjs from './plugins/dayjs.js'
import "leaflet/dist/leaflet.css";
import VueDatePicker from './plugins/vue3datepicker'


const vuetify = createVuetify({
  components,
  directives,
  locale: {
    locale: 'es',
  },
  date: {
    locale: {
      es: 'es-ES',
    },
  },
})

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify)

app.provide('dayjs', dayjs)
app.component('VueDatePicker', VueDatePicker);

app.mount('#app')
