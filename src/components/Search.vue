<template>
    <div v-if="results" class="row grid" style="margin-bottom: 0px !important;">
        <EntityBrief class="col s12 l6 xl4 grid-item" v-for="result in results" :key="result" :d="result.item" />
    </div>
    <div v-else>no results</div>
</template>

<script>
import { inject, ref, watch } from 'vue';
import Masonry from 'masonry-layout';

var msnry;
var reloadMsnry = true;

export default {
    setup() {
        const searchTerm = inject('searchTerm');
        const searchWorker = inject('searchWorker');

        const results = ref([]);

        searchWorker.onmessage = function (e) {
            results.value = e.data;
        }

        function getResults(q) {
            if (q) searchWorker.postMessage(q);
            else results.value = [];

            reloadMsnry = true;
        }

        getResults(searchTerm.value);

        watch(() => searchTerm.value, getResults);

        return { results };
    },
    mounted() {
        msnry = new Masonry('.grid', {
            percentPosition: true,
            transitionDuration: 0,
        });
    },
    updated() {
        if (reloadMsnry) {
            msnry.reloadItems();
            msnry.layout();
            reloadMsnry = false;
        }
    }
}
</script>