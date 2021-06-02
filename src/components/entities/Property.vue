<template>
    <EntityCard :entity="entity" :categories="!card">
        <template #beforeTags v-if="entity.property.type !== 'any'">
            <Tag :value="entity.property.type" severity="info" style="text-transform: capitalize" />
        </template>
    </EntityCard>

    <Fieldset legend="Found On" v-if="!card">
        <Grid :gutter="10" compact>
            <GridItem v-for="id in entity.property.entities" :key="id">
                <Entity :id="id" card categories />
            </GridItem>
        </Grid>
    </Fieldset>
</template>

<script>
import Tag from 'primevue/tag';
import Fieldset from 'primevue/fieldset';

import EntityCard from './parts/EntityCard.vue';
import Grid from '../Grid.vue';
import GridItem from '../GridItem.vue';

export default {
    name: 'Property',
    components: { EntityCard, Grid, GridItem, Tag, Fieldset },
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
