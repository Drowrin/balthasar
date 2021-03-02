<template>
    <div class="grid" ref="grid" :style="`column-count: ${gridCols}; column-gap: 10px`">
        <slot />
    </div>
</template>

<style scoped>
.grid {
    margin: 0px;
    padding: 10px;
}
.grid > * {
    break-inside: avoid;
    margin: 0 0 10px 0;
}
</style>

<script>
import { onMounted, ref } from 'vue';

export default {
    setup() {
        const gridCols = ref(1);
        const grid = ref(null);

        function updateWidth() {
            var w = grid.value.clientWidth;

            gridCols.value = Math.max(1, Math.floor(w / 450));
        }

        onMounted(function () {
            window.onresize = updateWidth;
            updateWidth();
        });

        return { gridCols, grid };
    },
};
</script>
