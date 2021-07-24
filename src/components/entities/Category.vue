<template>
    <EntityCard :entity="entity" categories v-if="card" />

    <Card v-else>
        <template #header v-if="entity.img">
            <img :src="entity.img.uri" class="header-image" />
        </template>

        <template #title>
            {{ entity.name }}
        </template>

        <template #content>
            <Markdown :source="entity.description" />
        </template>
    </Card>

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
import Card from 'primevue/card';

import EntityCard from './parts/EntityCard.vue';
import Markdown from '../Markdown.vue';
import Grid from '../Grid.vue';
import GridItem from '../GridItem.vue';

export default {
    name: 'Category',
    components: { EntityCard, Markdown, Grid, GridItem, Fieldset, Card },
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
    provide: {
        entityBrief: true,
    },
};
</script>
