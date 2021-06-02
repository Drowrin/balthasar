<template>
    <EntityLink :entity="entity">
        <slot name="title">{{ entity.name }}</slot>
    </EntityLink>

    <div style="float: right" v-if="categoriesEnabled">
        <slot name="beforeTags" />

        <span
            class="category-label"
            style="margin-left: 5px"
            v-for="cat in entity.categories"
            :key="cat"
        >
            <EntityTag :entity="cat" />
        </span>

        <Tag
            v-if="typeTag"
            :value="entity.type"
            severity="info"
            style="margin-left: 5px; text-transform: capitalize"
        />

        <slot name="afterTags" />
    </div>
</template>

<script>
import { inject } from 'vue';

import Tag from 'primevue/tag';

import EntityLink from './EntityLink.vue';
import EntityTag from './EntityTag.vue';

export default {
    name: 'TitleRow',
    components: { Tag, EntityLink, EntityTag },
    props: {
        entity: {
            type: Object,
            required: true,
        },
    },
    setup({ entity }) {
        let typeTag =
            entity.type !== 'entity' &&
            !entity.categories.map((c) => c.name.toLowerCase()).includes(entity.type);

        let categoriesEnabled = inject('categoriesEnabled');

        return { typeTag, categoriesEnabled };
    },
};
</script>
