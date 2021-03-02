import { createApp } from 'vue';
import router from './router';
import './index.css';

import App from './App.vue';

import EntityBreif from './components/EntityBrief.vue';
import EntityLink from './components/EntityLink.vue';
import Grid from './components/Grid.vue';

const app = createApp(App).use(router);

app.component('EntityBrief', EntityBreif);
app.component('EntityLink', EntityLink);
app.component('Grid', Grid);

app.mount('#app');
