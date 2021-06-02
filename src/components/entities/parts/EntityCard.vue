<template>
    <Card :class="c">
        <template #header v-if="entity.img && image">
            <img :src="entity.img.uri" />
        </template>

        <template #title>
            <TitleRow :entity="entity">
                <template #title v-if="$slots.title">
                    <slot name="title" />
                </template>
                <template #beforeTags v-if="$slots.beforeTags">
                    <slot name="beforeTags" />
                </template>
                <template #afterTags v-if="$slots.afterTags">
                    <slot name="afterTags" />
                </template>
            </TitleRow>
        </template>

        <template #content>
            <slot name="blocks" />

            <Divider v-if="$slots.blocks && (entity.description || $slots.content)" />

            <slot name="content">
                <Markdown :source="entity.description.rendered" v-if="entity.description" />
            </slot>
        </template>

        <template #footer v-if="$slots.footer">
            <slot name="footer" />
        </template>
    </Card>
</template>

<script>
import { provide } from 'vue';

import Card from 'primevue/card';
import Divider from 'primevue/divider';
import TitleRow from './TitleRow.vue';
import Markdown from '../../Markdown.vue';

export default {
    name: 'EntityCard',
    components: { Card, Divider, TitleRow, Markdown },
    props: {
        entity: {
            type: Object,
            required: true,
        },
        image: {
            type: Boolean,
            default: true,
        },
        'page-block': {
            type: Boolean,
            default: false,
        },
        categories: {
            type: Boolean,
            default: false,
        },
    },
    setup(props) {
        let c = props.pageBlock ? 'page-card' : '';

        if (props.categories) {
            provide('categoriesEnabled', props.categories);
        }

        return { c };
    },
};
</script>
