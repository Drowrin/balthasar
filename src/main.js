import { createApp } from 'vue'
import router from './router'
import './index.css'

import App from './App.vue'

import EntityBreif from "./components/EntityBrief.vue"
import EntityLink from "./components/EntityLink.vue"

const app = createApp(App).use(router);

app.component("EntityBrief", EntityBreif);
app.component("EntityLink", EntityLink);

app.mount('#app');
