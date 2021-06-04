<template>
    <div
        ref="grid"
        class="grid"
        :style="`--grid-width: ${gridWidth}; --grid-gutter: ${gutter}px`"
        v-masonry
        transition-duration="0s"
        item-selector=".grid-item"
        :percent-position="true"
        :gutter="gutter"
    >
        <slot />
    </div>
</template>

<style>
.grid {
    margin: 0px;
    padding: 0px;
    position: relative;
}

.grid-item {
    padding: 0px;
    margin: 0px;
    margin-bottom: var(--grid-gutter);
    width: var(--grid-width);
}
</style>

<script>
import { onMounted, onUpdated, onBeforeUnmount, ref } from 'vue';

export default {
    name: 'Grid',
    props: {
        /**
         * This value (in px) is subtracted from the available width when setting grid item widths
         * Use if an external component messes with available width (like a scroll bar or padding)
         */
        offset: {
            type: Number,
            default: 0,
        },
        /**
         * The minimum width (in px) a grid item can have before collapsing columns
         */
        breakpoint: {
            type: Number,
            default: 360,
        },
        /**
         * Optional space (in px) between items horizontally
         */
        gutter: {
            type: Number,
            default: 0,
        },
        /**
         * If true, items will be organized to optimize for the smallest vertical space usage
         * This is accomplished by sorting items by height
         */
        compact: {
            type: Boolean,
            default: false,
        },
    },
    setup(props) {
        const grid = ref(null);
        const gridWidth = ref(`calc(100% - ${props.offset})`);

        let lastWidth = 0;
        let needUpdate = true;

        function updateWidth() {
            if (!!grid.value) {
                let w = grid.value.clientWidth;

                if (w != lastWidth || needUpdate) {
                    lastWidth = w;
                    needUpdate = false;

                    let cols = Math.max(1, Math.floor(w / props.breakpoint));
                    let percentage = 100 / cols;
                    let eachOffset = props.offset / cols;
                    let eachGutter = (props.gutter * (cols - 1)) / cols;
                    gridWidth.value = `calc(${percentage}% - ${eachOffset}px - ${eachGutter}px)`;

                    if (props.compact) {
                        let items = grid.value.querySelectorAll('.grid-item');
                        items = [...items].sort((a, b) => b.offsetHeight - a.offsetHeight);

                        items.forEach((i) => {
                            grid.value.appendChild(i);
                        });
                    }
                }
            }
        }

        const ro = new ResizeObserver(updateWidth);

        onMounted(function () {
            ro.observe(grid.value);

            updateWidth();
        });

        onBeforeUnmount(function () {
            ro.unobserve(grid.value);
        });

        onUpdated(() => {
            needUpdate = true;
            updateWidth();
        });

        return { grid, gridWidth };
    },
};
</script>
