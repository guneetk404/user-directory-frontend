import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.css'
import router from './router'

// import gAuthPlugin from 'vue3-google-oauth2'
// import VueToast from 'vue-toast-notification'
// import ToastPlugin from 'vue-toast-notification';

// import 'vue-toast-notification/dist/theme-bootstrap.css'
import vue3google from 'vue3-google-login'

const app = createApp(App)
app.use(router)
// app.use(gAuthPlugin,{
//           clientId:process.env.CLIENT_ID,
//           scope:'email',
//           prompt:'consent'
// })
// app.use(ToastPlugin)
const CLIENT_ID='152886278588-403jcegl965fcofhuhnpq6sa2mkgnhd0.apps.googleusercontent.com'
app.use(vue3google,{
          clientId: CLIENT_ID
})

app.mount('#app')
