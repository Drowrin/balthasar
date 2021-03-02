<template>
    <Grid>
        <EntityBrief v-for="result in results" :key="result" :d="result.item" />
    </Grid>
</template>

<script>
import { inject, ref, watch } from 'vue';

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
        }

        getResults(searchTerm.value);

        watch(() => searchTerm.value, getResults);

        return { results };
    },
};
</script>
