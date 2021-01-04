<template>
    <div v-if="results" class="row">
        <EntityBrief class="col s12 l6 xl4" v-for="result in results" :key="result" :d="result" />
    </div>
    <div v-else>no results</div>
</template>

<script>
import { inject, ref, watch } from 'vue';

export default {
    setup() {
        const searchTerm = inject('searchTerm');
        const fuse = inject('fuse');
        const searchArray = inject('searchArray');

        const results = ref([]);

        function getResults(q) {
            if (q) {
                results.value = fuse.value.search(q).map(r => searchArray.value[r.refIndex]);
                console.log(results.value);
            }
            else results.value = [];
        }

        getResults(searchTerm.value);

        watch(() => searchTerm.value, getResults);

        return { results };
    }
}
</script>