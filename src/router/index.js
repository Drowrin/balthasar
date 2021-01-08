import { createWebHistory, createRouter } from 'vue-router';

const Home = () => import('../components/Home.vue');
const Search = () => import('../components/Search.vue');
const Entity = () => import('../components/Entity.vue');

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/search',
        name: 'Search',
        component: Search,
    },
    {
        path: '/entity/:id',
        name: 'Entity',
        component: Entity,
        props: true,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
