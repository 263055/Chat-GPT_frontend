import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import 'element-plus/dist/index.css'
import axios from "axios";
const app = createApp(App)

axios.defaults.baseURL = 'http://39.101.66.253:8080'
axios.defaults.withCredentials=true

app.use(createPinia())
app.use(router)

app.mount('#app')
