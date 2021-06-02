<template>
    <component v-if="card" :is="componentType" :entity="entity" card />

    <div v-else id="entity-page">
        <div>
            <component v-if="entity !== undefined" :is="componentType" :entity="entity" />

            <NotFound v-else />
        </div>
    </div>
</template>

<style>
#entity-page > * {
    margin: auto;
    padding: 10px;
    display: flex;
    flex-direction: column;
}
</style>

<script>
import { provide } from 'vue';
import { useStore } from 'vuex';

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

    components: { NotFound },

    setup(props) {
        provide('categoriesEnabled', props.categories);

        const store = useStore();
        const manifest = store.state.manifest;
        const entity = manifest[props.id];

        const componentType = componentTypes[entity?.type] || UnknownType;

        return { manifest, entity, componentType };
    },
};
</script>
