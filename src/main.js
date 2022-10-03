/*Este es el entry point de la app. */
import { createApp } from 'vue'
import App from './App.vue'
import router from './routers/index.js'
import './assets/styles/main.css'



createApp(App).use(router).mount('#app')