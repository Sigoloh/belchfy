import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { OhVueIcon, addIcons } from "oh-vue-icons";
import {
     FaPlay,
     FaPause,
     FaSearch,
     FaRandom,
     MdQueueOutlined,
     MdPlaylistremove,
     MdSkipnext, 
     MdSkipprevious, 
     RiLoader3Line,
     FaAngleRight,
     CoReload
} from "oh-vue-icons/icons";


const app = createApp(App)

addIcons(
    FaPlay, 
    FaPause, 
    FaSearch, 
    FaRandom, 
    MdQueueOutlined, 
    MdPlaylistremove, 
    MdSkipnext, 
    MdSkipprevious, 
    RiLoader3Line,
    FaAngleRight,
    CoReload
);

app.component("v-icon", OhVueIcon);

app.use(router)

app.mount('#app')
