import { createWebHistory, createRouter } from 'vue-router';
import store from './store';

const Loading = () => import('./components/Loading.vue');
const NotFound = () => import('./components/NotFound.vue');
const Search = () => import('./components/Search.vue');
const Entity = () => import('./components/Entity.vue');

function waitForManifest(to) {
    if (!store.state.manifest) {
        console.log('waiting for manifest...');
        return { path: '/loading', query: { to: to.fullPath } };
    }
}

function checkExists(to) {
    let id = to.params.id.join('.');
    if (`${id}.*` in store.state.manifest) {
        return { path: to.path + '/*', query: to.query, hash: to.hash };
    }
    if (!(id in store.state.manifest)) {
        return '/notfound';
    }
}

const routes = [
    {
        path: '/',
        redirect: '/home',
    },

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
        path: '/notfound',
        name: 'NotFound',
        component: NotFound,
    },

    {
        path: '/:id+',
        name: 'Entity',
        component: Entity,
        props: (route) => {
            return {
                id: route.params.id.join('.'),
            };
        },
        beforeEnter: [waitForManifest, checkExists],
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
