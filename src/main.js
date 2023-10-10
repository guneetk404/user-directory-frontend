import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.css'
import router from './router'
import '@mdi/font/css/materialdesignicons.css'; // Import the MDI CSS

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import vue3google from 'vue3-google-login'
const vuetify = createVuetify({
          components,
          directives,
        })
const app = createApp(App)
app.use(vuetify)
app.use(router)
const CLIENT_ID='152886278588-403jcegl965fcofhuhnpq6sa2mkgnhd0.apps.googleusercontent.com'
app.use(vue3google,{
          clientId: CLIENT_ID
})
app.mount('#app')
