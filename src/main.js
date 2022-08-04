import { createApp } from 'vue'
import logoPlugin from './plugins/logoPlugin'
import directivesPligin from './plugins/directivesPligin'
import router from './router'
import store from './store'
import './index.css'
import 'uno.css'
import 'ant-design-vue/dist/antd.css';
import App from './App.vue'

const app = createApp(App)
app.use(router)
app.use(store)
app.use(logoPlugin)
app.use(directivesPligin)
app.mount('#app')
