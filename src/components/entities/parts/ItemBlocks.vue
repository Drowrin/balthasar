<template>
    <span v-if="entity.item?.weight" class="card-block"> {{ entity.item.weight }} lb </span>
    <CostBlocks v-if="entity.item?.cost" :entity="entity" class="card-block" />
</template>

<script>
import CostBlocks from './CostBlocks.vue';

export default {
    name: 'ItemBlocks',
    components: { CostBlocks },
    props: {
        entity: {
            type: Object,
            required: true,
        },
    },
};
</script>
