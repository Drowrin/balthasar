<template>
    <EntityCard :entity="entity" :categories="!card">
        <template #blocks>
            Sublineage of:
            <EntityLink tooltip class="card-block" :entity="entity.sublineage.of" />

            <div v-if="!card" style="float: right">
                <span style="float: left; padding: 7px">
                    Include {{ entity.sublineage.of.name }} Traits
                </span>
                <InputSwitch v-model="displayFull" style="margin: 10px" />
            </div>
        </template>
    </EntityCard>

    <LineageDetails
        v-if="!card"
        :lineage="lineage"
        :delta="entity.sublineage.delta"
        :style="`--origin-text: 'From ${entity.sublineage.of.name}: ';`"
    />
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
