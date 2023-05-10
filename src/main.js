import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { VDataTable } from 'vuetify/labs/VDataTable'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

const vuetify = createVuetify({
  components: {
    ...components,
    VDataTable
  },
  directives,
  icons: {
    defaultSet: 'mdi'
  }
})

createApp(App).use(createPinia()).use(router).use(vuetify).mount('#app')
