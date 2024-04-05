import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from "./router.js";
const app = createApp(App)
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

import store from './store';

import * as ELIcons from '@element-plus/icons-vue'
for (let iconName in ELIcons){
    app.component(iconName,ELIcons[iconName])
}

localStorage.removeItem('loginData')

app.use(store);
app.use(ElementPlus,{locale:zhCn})
app.use(router)
app.mount('#app')
