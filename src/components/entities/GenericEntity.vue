<template>
    <EntityCard :entity="entity" :page-block="!card" :categories="!card" />
</template>

<script>
import EntityCard from './parts/EntityCard.vue';

export default {
    name: 'GenericEntity',
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
