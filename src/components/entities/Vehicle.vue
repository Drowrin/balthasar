<template>
    <EntityCard :entity="entity" :page-block="!card" :categories="!card">
        <template #blocks>
            <ProficiencyBlocks :entity="entity" />
            <ToolBlocks :entity="entity" />

            <div>
                <span v-if="entity.vehicle.speed" class="card-block">
                    Speed: {{ entity.vehicle.speed }}
                </span>
                <span v-if="entity.vehicle.capacity" class="card-block">
                    Capacity: {{ entity.vehicle.capacity }}
                </span>
                <span v-if="entity.vehicle.workers" class="card-block">
                    Workers: {{ entity.vehicle.workers }}
                </span>
            </div>
        </template>
    </EntityCard>
</template>

<script>
import EntityCard from './parts/EntityCard.vue';
import ToolBlocks from './parts/ToolBlocks.vue';
import ProficiencyBlocks from './parts/ProficiencyBlocks.vue';

export default {
    name: 'VehicleBrief',
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
