import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './store'
import { getSessionUserAPI } from './api'



getSessionUserAPI().then(response => {
    if (response.code === 200) {
        store.userId = response.data;
    }
})

const app = createApp(App)

app.use(router)

app.mount('#app')