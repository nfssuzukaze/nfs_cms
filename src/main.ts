import { createApp } from 'vue'

import 'virtual:windi.css'
import 'element-plus/dist/index.css'
import '@/assets/initial.css'

import App from './App.vue'
import router from './router'
import pinia from './stores'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(pinia)
app.use(router)
app.use(ElementPlus, {
  locale: zhCn
})

app.mount('#app')
