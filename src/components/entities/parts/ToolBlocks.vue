<template>
    <EntityLink
        tooltip
        class="card-block"
        v-for="activity in entity.activities"
        :key="activity"
        :entity="activity"
    >
        Activity: {{ activity.name }}
    </EntityLink>
</template>

<script>
import EntityLink from './EntityLink.vue';

export default {
    name: 'ToolBlocks',
    components: { EntityLink },
    props: {
        entity: {
            type: Object,
            required: true,
        },
    },
};
</script>
