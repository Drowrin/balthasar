<template>
    <EntityCard :entity="entity" :page-block="!card" :categories="!card">
        <template #blocks>
            <ProficiencyBlocks :entity="entity" />
        </template>
    </EntityCard>
</template>

<script>
import EntityCard from './parts/EntityCard.vue';
import ProficiencyBlocks from './parts/ProficiencyBlocks.vue';

export default {
    name: 'Proficiency',
    components: { EntityCard, ProficiencyBlocks },
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
