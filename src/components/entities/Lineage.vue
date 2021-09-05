<template>
    <EntityCard :entity="entity" :categories="!card">
        <template #blocks v-if="lineage.subs.length">
            Sublineages:
            <EntityLink
                tooltip
                class="card-block"
                v-for="sub in lineage.subs"
                :key="sub"
                :entity="sub"
            />
        </template>
    </EntityCard>

    <LineageDetails v-if="!card" :lineage="lineage" />
</template>

<style>
.p-fieldset-legend-text {
    font-size: 1rem;
}

.p-fieldset {
    background: none;
    margin-top: 20px;
}

.p-fieldset .p-fieldset-legend {
    background: none;
    padding: 0px 10px 0 10px;
}

.p-fieldset .p-fieldset-content {
    padding: 0;
}
</style>

<script>
import EntityCard from './parts/EntityCard.vue';
import EntityLink from './parts/EntityLink.vue';
import LineageDetails from './parts/LineageDetails.vue';

export default {
    name: 'Lineage',
    components: { EntityCard, EntityLink, LineageDetails },
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
    setup(props) {
        let lineage = props.entity.lineage;

        return { lineage };
    },
};
</script>
