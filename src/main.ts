import { createApp } from 'vue'

import 'virtual:windi.css'
import 'element-plus/dist/index.css'
import '@/assets/initial.css'

import App from './App.vue'
import router from './router'
import pinia from './stores'
import ElementPlus from 'element-plus'

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(ElementPlus)

app.mount('#app')
