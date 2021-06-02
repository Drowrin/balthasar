<template>
    <div class="grid-item" v-masonry-tile>
        <slot />
    </div>
</template>

<script>
export default {
    name: 'GridItem',
};
</script>
