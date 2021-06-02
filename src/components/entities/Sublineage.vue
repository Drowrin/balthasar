<template>
    <EntityCard :entity="entity" :categories="!card">
        <template #blocks>
            Sublineage of:
            <EntityLink tooltip class="card-block" :entity="entity.sublineage.of" />

            <div v-if="!card" style="float: right">
                <!-- TODO: better wording? -->
                <span style="padding: 7px">Sublineage Differences Only</span>
                <InputSwitch v-model="displayFull" />
                <span style="padding: 7px">Include Base Lineage</span>
            </div>
        </template>
    </EntityCard>

    <LineageDetails v-if="!card" :lineage="lineage" />
</template>

<script>
import { computed, ref } from 'vue';

import InputSwitch from 'primevue/inputswitch';

import EntityCard from './parts/EntityCard.vue';
import EntityLink from './parts/EntityLink.vue';
import LineageDetails from './parts/LineageDetails.vue';

export default {
    name: 'Sublineage',
    components: { EntityCard, EntityLink, InputSwitch, LineageDetails },
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
        const displayFull = ref(false);

        const lineage = computed(() =>
            displayFull.value ? props.entity.sublineage.full : props.entity.sublineage.delta
        );

        return {
            displayFull,
            lineage,
        };
    },
};
</script>
