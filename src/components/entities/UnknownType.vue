<template>
    <EntityCard :entity="entity">
        <template #blocks>
            Unrecognized Entity Type: <strong>{{ entity.type }}</strong>
        </template>
        <template #content v-if="!card">
            <pre><code>{{ data }}</code></pre>
        </template>
    </EntityCard>
</template>

<style scoped>
pre {
    white-space: pre-wrap;
}
</style>

<script>
import EntityCard from './parts/EntityCard.vue';

import yaml from 'js-yaml';

export default {
    name: 'UnknownType',
    components: { EntityCard },
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
    computed: {
        data() {
            return yaml.dump(this.entity);
        },
    },
};
</script>
