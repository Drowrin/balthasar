<template>
    <Card :class="c">
        <template #header v-if="entity.img && image">
            <img :src="entity.img.uri" class="header-image"/>
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
            <Requirements v-if="requirements && entity.req" :requirements="entity.req" />

            <Divider
                v-if="
                    requirements &&
                    entity.req &&
                    ($slots.blocks || entity.description || $slots.content)
                "
            />

            <slot name="blocks" />

            <Divider v-if="$slots.blocks && (entity.description || $slots.content)" />

            <slot name="content">
                <Markdown :source="entity.description" v-if="description && entity.description" />
            </slot>
        </template>

        <template #footer v-if="$slots.footer">
            <slot name="footer" />
        </template>
    </Card>
</template>

<style>
.header-image {
    max-height: 600px;
    max-width: 100%;
    width: auto !important;
    height: auto !important;
    margin: 10px auto 0;
    display: block
}
</style>

<script>
import { provide } from 'vue';

import Card from 'primevue/card';
import Divider from 'primevue/divider';
import TitleRow from './TitleRow.vue';
import Markdown from '../../Markdown.vue';

import Requirements from './Requirements.vue';

export default {
    name: 'EntityCard',
    components: { Card, Divider, TitleRow, Markdown, Requirements },
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
        description: {
            type: Boolean,
            default: true,
        },
        requirements: {
            type: Boolean,
            default: true,
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
