<template>
    <EntityCard :entity="entity" :page-block="!card" :categories="!card">
        <template #beforeTags>
            <Tag :value="entity.trait.type" severity="info" style="text-transform: capitalize" />
        </template>
        <template #blocks v-if="entity.trait.requirements">
            <EntityLink tooltip :entity="entity.trait.requirements" class="card-block">
                Requires: {{ entity.trait.requirements.name }}
            </EntityLink>
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
