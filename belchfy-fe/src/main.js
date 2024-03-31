import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { OhVueIcon, addIcons } from "oh-vue-icons";
import { FaPlay, FaPause, FaSearch } from "oh-vue-icons/icons";

const app = createApp(App)

addIcons(FaPlay, FaPause, FaSearch);

app.component("v-icon", OhVueIcon);

app.use(router)

app.mount('#app')
