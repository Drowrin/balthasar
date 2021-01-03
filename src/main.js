import { createApp } from 'vue'
import router from './router'
import './index.css'

import App from './App.vue'

import EntityBreif from "./components/brief/EntityBrief.vue"
import WeaponBrief from "./components/brief/WeaponBrief.vue"
import ArmorBrief from "./components/brief/ArmorBrief.vue"
import EquipmentBrief from "./components/brief/EquipmentBrief.vue"
import VehicleBrief from "./components/brief/VehicleBrief.vue"
import PropertyBrief from "./components/brief/PropertyBrief.vue"

const app = createApp(App).use(router);

app.component("EntityBrief", EntityBreif);
app.component("WeaponBrief", WeaponBrief);
app.component("ArmorBrief", ArmorBrief);
app.component("EquipmentBrief", EquipmentBrief);
app.component("VehicleBrief", VehicleBrief);
app.component("PropertyBrief", PropertyBrief);

app.mount('#app');
