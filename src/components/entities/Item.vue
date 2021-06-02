<template>
    <EntityCard :entity="entity" :page-block="!card" :categories="!card">
        <template #blocks>
            <ItemBlocks :entity="entity" />
        </template>
    </EntityCard>
</template>

<script>
import EntityCard from './parts/EntityCard.vue';
import ItemBlocks from './parts/ItemBlocks.vue';

export default {
    name: 'Item',
    components: { EntityCard, ItemBlocks },
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
