<template>
    <EntityCard :entity="entity" v-if="card" />

    <div v-else>
        <Card class="page-header">
            <template #title>
                <TitleRow :entity="entity" />
            </template>
        </Card>

        <div id="article-section">
            <Card v-for="[n, d] in Object.entries(entity.article)" :key="n" class="article-card">
                <template #title>
                    {{ n }}
                </template>
                <template #content>
                    <Markdown :source="d.rendered" />
                </template>
            </Card>
        </div>
    </div>
</template>

<style>
#article-section {
    padding-top: 5px;
    margin: auto;
    justify-content: center;
    align-items: flex-start;
}

.article-card {
    margin: 5px auto;
    height: fit-content;
}

@media (min-width: 990px) {
    #article-section {
        display: flex;
        flex-wrap: wrap;
    }

    .article-card {
        width: 720px;
        margin: 5px;
    }
}
</style>

<script>
import Card from 'primevue/card';
import EntityCard from './parts/EntityCard.vue';
import Markdown from '../Markdown.vue';
import TitleRow from './parts/TitleRow.vue';

export default {
    name: 'Article',
    components: { EntityCard, Markdown, Card, TitleRow },
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
