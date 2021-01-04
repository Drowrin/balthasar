import { createApp } from 'vue'
import router from './router'
import './index.css'

import App from './App.vue'

import EntityBreif from "./components/EntityBrief.vue"

const app = createApp(App).use(router);

app.component("EntityBrief", EntityBreif);

app.mount('#app');
