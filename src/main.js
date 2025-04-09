import './style/tailwind.css'
import './assets/normalize.css'
import { createApp } from 'vue'

import { store } from './stores'


import App from './App.vue'
import router from './router'

const app = createApp(App)

console.log('app')
app.use(store)
app.use(router)

app.mount('#app')
