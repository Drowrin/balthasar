<template>
    <div
        ref="grid"
        style="margin: 0px; padding: 5px; display: flex; flex-flow: column wrap; max-width: 100%"
    >
        <slot />
    </div>
</template>

<script>
import { onMounted, onUpdated, ref } from 'vue';
import imagesLoaded from 'imagesloaded';

export default {
    setup() {
        const grid = ref(null);

        class Masonry {
            constructor() {
                this.el = grid.value;
                this.cols = 1;
                this.heights = [];
                this.maxheight = 0;
            }
            items() {
                return grid.value.querySelectorAll('.grid-item');
            }
            updateWidth() {
                let w = grid.value.clientWidth;
                this.cols = Math.max(1, Math.floor(w / 450));
                // console.log(`width: ${w}px | cols: ${this.cols}`);
                this.layout();
            }
            layout() {
                this.reset();
                this.setLayout();
                this.pad();
            }
            reset() {
                this.heights = [];
                this.maxheight = 0;
                const fillers = grid.value.querySelectorAll('.grid-pad');
                fillers.forEach((f) => {
                    f.parentNode.removeChild(f);
                });
            }
            setLayout() {
                this.items().forEach((e) => {
                    const style = getComputedStyle(e);
                    const order = style.order || style.msFlexOrder;
                    const i = order - 1;
                    if (!this.heights[i]) this.heights[i] = 0;
                    this.heights[i] += parseFloat(style.height, 10) + 5;
                });

                this.maxheight = Math.max(...this.heights);
                grid.value.style.height = `${this.maxheight}px`;
            }
            pad() {
                this.heights.map((h, id) => {
                    if (h < this.maxheight && h > 0) {
                        const pad = document.createElement('div');
                        pad.className = 'grid-pad';
                        pad.style.height = `${this.maxheight - h - 5}px`;
                        pad.style.width = `${100 / this.cols}%`;
                        pad.style.order = id + 1;
                        pad.style.msFlexOrder = id + 1;
                        grid.value.appendChild(pad);
                    }
                });
            }
        }

        const msnry = ref(new Masonry());

        onMounted(function () {
            window.onresize = () => {
                msnry.value.updateWidth();
            };
            msnry.value.updateWidth();
        });

        onUpdated(() => {
            imagesLoaded(grid.value, function () {
                msnry.value.layout();
            });
        });

        return { msnry, grid };
    },
};
</script>
