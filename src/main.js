import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import axios from 'axios';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';

const app = createApp(App)

// axios请求拦截
axios.interceptors.request.use(config => {
    // 为请求头对象,添加token验证的Authorization字段
    config.headers.Authorization = window.localStorage.getItem('token');
    return config;
})

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}

app.use(router).use(ElementPlus).mount('#app');
