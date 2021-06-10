import { createApp } from 'vue';

import router from './router';
import store from './store';

import 'tippy.js/animations/shift-away-extreme.css';
import 'tippy.js/dist/tippy.css';
import 'primeicons/primeicons.css';
import 'primevue/resources/primevue.min.css';
import 'primevue/resources/themes/mdc-dark-indigo/theme.css';
import 'primeflex/primeflex.css';

import './index.css';

import PrimeVue from 'primevue/config';
import Tooltip from 'primevue/tooltip';
import mitt from 'mitt';
import { VueMasonryPlugin } from 'vue-masonry/src/masonry-vue3.plugin';

import App from './App.vue';

import Entity from './components/Entity.vue';

const app = createApp(App).use(router).use(store);

app.use(PrimeVue, { riplle: true });
app.directive('tooltip', Tooltip);

const emitter = mitt();

app.config.globalProperties.emitter = emitter;
app.use(VueMasonryPlugin);
app.provide('redrawMasonry', app.config.globalProperties.$redrawVueMasonry);

app.component('Entity', Entity);

app.mount('#app');
