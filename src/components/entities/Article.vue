<template>
    <EntityCard :entity="entity" v-if="card" />

    <div v-else>
        <EntityCard :entity="entity" :description="false" :style="style" />

        <div id="article-wrapper" ref="wrapper">
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
#article-wrapper {
    margin: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-start;
}

.article-card {
    margin: 10px 0 0;
    height: fit-content;
    width: 100%;
}

@media (min-width: 1011px) {
    .article-card {
        margin: 10px 5px 0;
        width: 720px;
    }
}
</style>

<script>
import { onBeforeUnmount, onMounted, ref } from 'vue';

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
    setup(props) {
        let wrapper = ref(null);
        let style = ref('');

        function updateWidth() {
            if (wrapper.value !== null) {
                let w = wrapper.value.clientWidth;

                if (w <= 730) {
                    style.value = '';
                } else {
                    let cols = Math.floor(w / 730);
                    let count = wrapper.value.querySelectorAll('.article-card').length;
                    let mult = Math.min(count, cols);

                    style.value = `margin: auto; width: ${730 * mult - 10}px`;
                }
            }
        }

        const ro = new ResizeObserver(updateWidth);

        onMounted(() => {
            if (!props.card) {
                ro.observe(wrapper.value);
                updateWidth();
            }
        });

        onBeforeUnmount(() => {
            if (!props.card) {
                ro.unobserve(wrapper.value);
            }
        });

        return { wrapper, style };
    },
};
</script>
