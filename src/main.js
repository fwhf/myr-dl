import { createApp } from 'vue'

import ElementPlus from 'element-plus'
import zhCN from "element-plus/dist/locale/zh-cn.mjs" 
import 'element-plus/dist/index.css'

import './style.css'

import App from './App.vue'
import router from './router'
import store from './store'

const app = createApp(App);
app.use(router).use(store).use(ElementPlus, {locale:zhCN}).mount('#app')

