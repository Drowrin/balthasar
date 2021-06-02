<template>
    <EntityCard :entity="entity" :categories="!card" />

    <Fieldset legend="Contents" v-if="!card">
        <Grid :gutter="10" compact>
            <GridItem v-for="id in entity.entities" :key="id">
                <Entity :id="id" card categories />
            </GridItem>
        </Grid>
    </Fieldset>
</template>

<script>
import Fieldset from 'primevue/fieldset';

import EntityCard from './parts/EntityCard.vue';
import Grid from '../Grid.vue';
import GridItem from '../GridItem.vue';

export default {
    name: 'Category',
    components: { EntityCard, Grid, GridItem, Fieldset },
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
