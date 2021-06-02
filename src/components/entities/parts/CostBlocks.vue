<template>
    <span>
        <span v-if="entity.item?.cost?.pp">{{ entity.item.cost.pp }} pp</span>
        <span v-if="entity.item?.cost?.gp">{{ entity.item.cost.gp }} gp</span>
        <span v-if="entity.item?.cost?.ep">{{ entity.item.cost.ep }} ep</span>
        <span v-if="entity.item?.cost?.sp">{{ entity.item.cost.sp }} sp</span>
        <span v-if="entity.item?.cost?.cp">{{ entity.item.cost.cp }} cp</span>
    </span>
</template>

<script>
export default {
    name: 'CostBlocks',

    props: {
        entity: {
            type: Object,
            required: true,
        },
    },
};
</script>
