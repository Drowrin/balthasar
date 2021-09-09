<template>
    <div class="entity-title-row">
        <EntityLink :entity="entity" class="entity-card-title">
            <slot name="title">{{ entity.name }}</slot>
        </EntityLink>

        <div v-if="categoriesEnabled" class="card-tags">
            <slot name="beforeTags" />

            <span class="category-label" v-for="cat in entity.categories" :key="cat">
                <EntityTag :entity="cat" />
            </span>

            <Tag
                v-if="typeTag"
                :value="entity.type"
                severity="info"
                style="text-transform: capitalize"
            />

            <slot name="afterTags" />
        </div>
    </div>
</template>

<style>
.card-tags {
    display: flex;
    float: right;
    margin-top: 8px;
}

.card-tags .p-tag {
    padding: 3px 5px;
    margin-left: 2px;
}

.category-label {
    display: flex;
}

.entity-card-title {
    font-size: 1.3rem;
}
</style>

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
