<template>
    <EntityCard :entity="entity" :page-block="!card" :categories="!card">
        <template #blocks>
            <ProficiencyBlocks :entity="entity" />
            <ToolBlocks :entity="entity" />
        </template>
    </EntityCard>
</template>

<script>
import EntityCard from './parts/EntityCard.vue';
import ToolBlocks from './parts/ToolBlocks.vue';
import ProficiencyBlocks from './parts/ProficiencyBlocks.vue';

export default {
    name: 'Tool',
    components: { EntityCard, ToolBlocks, ProficiencyBlocks },
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
