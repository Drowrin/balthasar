<template>
    <component v-if="card" :is="componentType" :entity="entity" card />

    <div v-else id="entity-page">
        <div>
            <component v-if="entity !== undefined" :is="componentType" :entity="entity" />

            <NotFound v-else />
        </div>

        <div v-if="isDev">
            <Button
                @click="showCode = !showCode"
                icon="pi pi-info-circle"
                class="p-button-rounded p-button-outlined"
                style="position: fixed; bottom: 10px; margin: 5px"
                v-tooltip="(showCode ? 'Hide' : 'Show') + ' data (DEV build only)'"
            />

            <Card v-if="showCode">
                <template #content>
                    <pre><code>{{ rawData }}</code></pre>
                </template>
            </Card>
        </div>
    </div>
</template>

<style>
#entity-page > * {
    margin: auto;
    padding: 10px;
}
pre {
    white-space: pre-wrap;
}
</style>

<script>
import { provide, ref } from 'vue';
import { useStore } from 'vuex';
import yaml from 'js-yaml';

import Button from 'primevue/button';
import Card from 'primevue/card';
import Tooltip from 'primevue/tooltip';

import NotFound from './NotFound.vue';

import UnknownType from './entities/UnknownType.vue';

import Activity from './entities/Activity.vue';
import Armor from './entities/Armor.vue';
import Article from './entities/Article.vue';
import GenericEntity from './entities/GenericEntity.vue';
import Item from './entities/Item.vue';
import Language from './entities/Language.vue';
import Lineage from './entities/Lineage.vue';
import Proficiency from './entities/Proficiency.vue';
import Property from './entities/Property.vue';
import Spell from './entities/Spell.vue';
import Sublineage from './entities/Sublineage.vue';
import Tool from './entities/Tool.vue';
import Trait from './entities/Trait.vue';
import Vehicle from './entities/Vehicle.vue';
import Weapon from './entities/Weapon.vue';
import Category from './entities/Category.vue';

const componentTypes = {
    activity: Activity,
    armor: Armor,
    article: Article,
    category: Category,
    entity: GenericEntity,
    item: Item,
    language: Language,
    lineage: Lineage,
    proficiency: Proficiency,
    property: Property,
    spell: Spell,
    sublineage: Sublineage,
    tool: Tool,
    trait: Trait,
    vehicle: Vehicle,
    weapon: Weapon,
};

export default {
    name: 'EntityPage',

    props: {
        id: {
            type: String,
            required: true,
        },
        card: {
            type: Boolean,
            default: false,
        },
        categories: {
            type: Boolean,
            default: false,
        },
    },

    components: { NotFound, Button, Card },
    directives: { tooltip: Tooltip },

    setup(props) {
        provide('categoriesEnabled', props.categories);

        const store = useStore();
        const manifest = store.state.manifest;
        const entity = manifest[props.id];

        const isDev = import.meta.env.DEV;
        const showCode = ref(false);

        const componentType = componentTypes[entity?.type] || UnknownType;

        return { manifest, entity, componentType, isDev, showCode };
    },
    computed: {
        rawData() {
            if (this.isDev) return yaml.dump(this.entity);
        },
    },
};
</script>
