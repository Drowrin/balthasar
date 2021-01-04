import { createWebHistory, createRouter } from "vue-router"

import Home from "../components/Home.vue"
import Search from "../components/Search.vue"
import Entity from "../components/Entity.vue"

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/search",
    name: "Search",
    component: Search,
  },
  {
    path: "/entity/:id",
    name: "Entity",
    component: Entity,
    props: true,
  }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;