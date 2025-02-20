import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '@/assets/css/index.css'
import 'ant-design-vue/dist/reset.css'
import Vue3ColorPicker from 'vue3-colorpicker'
import 'vue3-colorpicker/style.css'
import Antd from 'ant-design-vue'
import App from './App.vue'
import router from './router'
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Antd)
app.use(Vue3ColorPicker)

app.mount('#app')
