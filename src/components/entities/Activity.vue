<template>
    <EntityCard :entity="entity" :categories="!card" :page-block="!card">
        <template #blocks>
            <span class="card-block">Time: {{ entity.activity.time }}</span>
        </template>
    </EntityCard>
</template>

<script>
import EntityCard from './parts/EntityCard.vue';

export default {
    name: 'Activity',
    components: { EntityCard },
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
