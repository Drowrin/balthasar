<template>
    <EntityCard :entity="entity" v-if="card" />

    <div v-else ref="wrapper" :style="style">
        <Card class="header">
            <template #title>
                {{ entity.name }}
            </template>
        </Card>

        <Divider />

        <Grid :gutter="10" :cols="cols">
            <GridItem v-for="[n, d] in Object.entries(entity.article)" :key="n">
                <Card>
                    <template #title>
                        {{ n }}
                    </template>
                    <template #content>
                        <Markdown :source="d.rendered" />
                    </template>
                </Card>
            </GridItem>
        </Grid>
    </div>
</template>

<style>
.header .p-card-title {
    text-align: center;
}
</style>

<script>
import { onBeforeUnmount, onMounted, ref } from 'vue';

import Card from 'primevue/card';
import Divider from 'primevue/divider';
import EntityCard from './parts/EntityCard.vue';
import Markdown from '../Markdown.vue';
import TitleRow from './parts/TitleRow.vue';
import Grid from '../Grid.vue';
import GridItem from '../GridItem.vue';

export default {
    name: 'Article',
    components: { EntityCard, Markdown, Card, TitleRow, Divider, Grid, GridItem },
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
        let wrapper = ref(null);
        let style = ref('');
        let cols = ref(1);

        function updateWidth() {
            if (wrapper.value !== null) {
                let w = wrapper.value.parentElement.clientWidth;

                let extraWidth = Math.max(w - 720, 0);
                let extraCols = Math.floor(extraWidth / 730);

                if (extraWidth == 0) {
                    style.value = '';
                } else {
                    let possibleCols = extraCols + 1;
                    let count = Object.entries(props.entity.article).length;
                    cols.value = Math.max(Math.min(count, possibleCols), 1);

                    style.value = `margin: auto; width: ${730 * cols.value - 10}px`;
                }
            }
        }

        const ro = new ResizeObserver(updateWidth);

        onMounted(() => {
            if (!props.card) {
                ro.observe(wrapper.value.parentElement);
                updateWidth();
            }
        });

        onBeforeUnmount(() => {
            if (!props.card) {
                ro.unobserve(wrapper.value.parentElement);
            }
        });

        return { wrapper, style, cols };
    },
};
</script>
