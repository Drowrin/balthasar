<template>
    <div v-if="results" class="row">
        <EntityBrief class="col s12 l6 xl4" v-for="result in results" :key="result" :d="result" />
    </div>
    <div v-else>no results</div>
</template>

<script>
import { inject, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

export default {
    setup() {
        const route = useRoute();

        const entities = inject('manifest').value.entities;

        const results = ref([]);

        function getResults(q) {
            if (q && entities[q])
                results.value = [entities[q]];
            else
                results.value = [];
        }

        getResults(route.query.q);

        watch(
            () => route.query.q,
            getResults,
        );

        return { results };
    }
}
</script>