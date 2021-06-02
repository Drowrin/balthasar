<template>
    <EntityCard :entity="entity" :page-block="!card" :categories="!card">
        <template #blocks>
            <ItemBlocks :entity="entity" />
            <span class="card-block" v-if="entity.weapon.damage || entity.weapon.type">
                {{ entity.weapon.damage }} {{ entity.weapon.type }}
            </span>
            <br />
            <EntityLink
                tooltip
                class="card-block"
                v-for="prop of entity.properties"
                :key="prop"
                :entity="prop"
            />
        </template>
    </EntityCard>
</template>

<script>
import EntityCard from './parts/EntityCard.vue';
import ItemBlocks from './parts/ItemBlocks.vue';
import EntityLink from './parts/EntityLink.vue';

export default {
    name: 'WeaponBrief',
    components: { EntityCard, EntityLink, ItemBlocks },
    props: {
        entity: {
            type: Object,
            required: true,
        },
        card: {
            type: Boolean,
            default: false,
        },
    },
};
</script>
