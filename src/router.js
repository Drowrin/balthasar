import { createWebHistory, createRouter } from 'vue-router';
import store from './store';

const Loading = () => import('./components/Loading.vue');
const Search = () => import('./components/Search.vue');
const EntityPage = () => import('./components/Entity.vue');

function waitForManifest(to) {
    if (!store.state.manifest) {
        console.log('waiting for manifest...');
        return { path: '/loading', query: { to: to.fullPath } };
    }
}

const routes = [
    {
        path: '/loading',
        name: 'Loading',
        component: Loading,
        beforeEnter: (to) => {
            if (store.state.manifest) {
                return to.query.to || '/';
            }
        },
    },

    {
        path: '/search',
        name: 'Search',
        component: Search,
        beforeEnter: [waitForManifest],
    },

    {
        path: '/',
        name: 'Home',
        component: EntityPage,
        props: () => {
            return { id: 'article.home' };
        },
        beforeEnter: [waitForManifest],
    },

    {
        path: '/:id+',
        name: 'Entity',
        component: EntityPage,
        props: (route) => {
            return {
                id: route.params.id.join('.'),
            };
        },
        beforeEnter: [waitForManifest],
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
