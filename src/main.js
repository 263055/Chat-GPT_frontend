import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import 'element-plus/dist/index.css'
import axios from "axios";

import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/preview.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';
import hljs from 'highlight.js';
VMdPreview.use(githubTheme, {
    Hljs: hljs,
});

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(VMdPreview);
app.mount('#app')
axios.defaults.withCredentials=true

axios.defaults.baseURL = 'http://localhost:8080' // aaaa 1
// axios.defaults.baseURL = '/api'

