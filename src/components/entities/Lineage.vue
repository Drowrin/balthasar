<template>
    <EntityCard :entity="entity" :categories="!card">
        <template #blocks>
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
