<template>
    <div
        ref="grid"
        v-if="results"
        style="margin-bottom: 0px !important; padding-top: 10px !important"
    >
        <div class="grid-sizer" :style="gridSize" />
        <EntityBrief
            :style="gridSize + `padding-right: 10px; padding-left: 10px;`"
            v-for="result in results"
            :key="result"
            :d="result.item"
        />
    </div>
    <div v-else>no results</div>
</template>

<script>
import { inject, nextTick, onMounted, onUpdated, ref, watch } from 'vue';
import Masonry from 'masonry-layout';
import imagesLoaded from 'imagesloaded';

var msnry;
var reloadMsnry = true;

export default {
    setup() {
        const searchTerm = inject('searchTerm');
        const searchWorker = inject('searchWorker');

        const results = ref([]);

        searchWorker.onmessage = function (e) {
            results.value = e.data;
        };

        function getResults(q) {
            if (q) searchWorker.postMessage(q);
            else results.value = [];

            reloadMsnry = true;
        }

        getResults(searchTerm.value);

        watch(() => searchTerm.value, getResults);

        const gridSize = ref('');
        const grid = ref(null);

        function updateMsnry() {
            msnry.reloadItems();
            msnry.layout();
        }

        var lastCount = 0;

        function updateWidth() {
            var w = grid.value.clientWidth;

            var count = Math.max(1, Math.floor(w / 450));

            if (lastCount != count) {
                gridSize.value = `width: ${100 / count}%;`;
                lastCount = count;
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        updateMsnry();
                        imagesLoaded(grid.value, updateMsnry);
                    });
                });
            }
        }

        var loaded = false;

        onMounted(function () {
            msnry = new Masonry(grid.value, {
                columnWidth: '.grid-sizer',
                percentPosition: true,
                transitionDuration: 0,
            });

            window.onresize = updateWidth;

            setTimeout(updateWidth, 25);
        });

        onUpdated(function () {
            if (reloadMsnry) {
                updateMsnry();
                imagesLoaded(grid.value, updateMsnry);
                reloadMsnry = false;
            }
        });

        return { results, gridSize, grid };
    },
};
</script>
