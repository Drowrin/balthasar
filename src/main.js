import { createApp, provide, ref, h } from 'vue'
import axios from 'axios';
import App from './App.vue'
import router from './router'
import './index.css'

const app = createApp(App).use(router).mount('#app');
