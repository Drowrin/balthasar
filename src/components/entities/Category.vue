<template>
    <EntityCard :entity="entity" categories v-if="card" />

    <Fieldset
        :toggleable="catfilters.length > 0"
        v-else
        :legend="entity.name"
        class="category-fieldset"
    >
        <Card style="margin-bottom: 5px">
            <template #header v-if="entity.img">
                <img :src="entity.img.uri" class="header-image" />
            </template>

            <template #content>
                <Markdown :source="entity.description" />
            </template>
        </Card>

        <Category
            v-for="cat of rootcats"
            :key="cat.id"
            :entity="cat"
            :catfilters="catfilters.concat([entity.id])"
        />

        <Divider v-if="rootents.length" />

        <Grid :gutter="10" compact>
            <GridItem v-for="ent in rootents" :key="ent.id">
                <Entity :id="ent.id" card />
            </GridItem>
        </Grid>
    </Fieldset>
</template>

<style>
.category-fieldset {
    margin-top: 5px;
}
</style>

<script>
import { useStore } from 'vuex';

import Fieldset from 'primevue/fieldset';
import Card from 'primevue/card';
import Divider from 'primevue/divider';

import EntityCard from './parts/EntityCard.vue';
import Markdown from '../Markdown.vue';
import Grid from '../Grid.vue';
import GridItem from '../GridItem.vue';

function inCat(cat, entity) {
    return entity.categories.map((c) => c.id).includes(cat.id);
}

export default {
    name: 'Category',
    components: { EntityCard, Markdown, Grid, GridItem, Fieldset, Card, Divider },
    props: {
        entity: {
            type: Object,
            required: true,
        },
        card: {
            type: Boolean,
            default: false,
        },
        catfilters: {
            type: Array,
            default: [],
        },
    },
    provide: {
        entityBrief: true,
    },
    setup(props) {
        const store = useStore();

        let entities = props.entity.entities
            .map((e) => store.state.manifest[e])
            .filter((e) => props.catfilters.every((c) => inCat(store.state.manifest[c], e)));

        let categories = entities.filter((e) => e.id.endsWith('*'));

        let rootcats = categories.filter((e) => !categories.some((c) => inCat(c, e)));
        // console.log(
        //     props.entity.id,
        //     rootcats.map((e) => e.id)
        // );
        let rootents = entities
            .filter((e) => !e.id.endsWith('*'))
            .filter((e) => !categories.some((c) => inCat(c, e)));

        return { rootcats, rootents };
    },
};
</script>
