<template>
    <router-link :to="`/entity/${d.id}`">
        <slot/>
    </router-link>
</template>

<script>
export default {
    props: {
        d: {
            type: Object,
            validator: d => d.id !== undefined,
            required: true,
        },
        tooltip: {
            type: Boolean,
            default: true,
        }
    }
}
</script>