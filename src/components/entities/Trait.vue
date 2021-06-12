<template>
    <EntityCard :entity="entity" :page-block="!card" :categories="!card">
        <template #beforeTags>
            <Tag :value="entity.trait" severity="info" style="text-transform: capitalize" />
        </template>
    </EntityCard>
</template>

<script>
import Tag from 'primevue/tag';

import EntityCard from './parts/EntityCard.vue';
import EntityLink from './parts/EntityLink.vue';

export default {
    name: 'Trait',
    components: { EntityCard, EntityLink, Tag },
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
