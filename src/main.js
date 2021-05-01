import { createApp } from 'vue';

import router from './router';
import store from './store';
import './index.css';

import App from './App.vue';

import EntityBreif from './components/EntityBrief.vue';
import EntityLink from './components/EntityLink.vue';
import FastGrid from './components/FastGrid.vue';
import GridItem from './components/GridItem.vue';
import Markdown from './components/Markdown.vue';

const app = createApp(App).use(router).use(store);

app.component('EntityBrief', EntityBreif);
app.component('EntityLink', EntityLink);
app.component('FastGrid', FastGrid);
app.component('GridItem', GridItem);
app.component('Markdown', Markdown);

app.mount('#app');
