<template>
    <Grid :offset="20" :gutter="10" style="padding: 10px">
        <GridItem v-for="result in results" :key="result">
            <Entity :id="result.item.id" card categories />
        </GridItem>
    </Grid>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';

import Grid from './Grid.vue';
import GridItem from './GridItem.vue';

export default {
    components: { Grid, GridItem },
    setup() {
        const store = useStore();
        const route = useRoute();

        store.commit('searchTerm', route.query.q);

        store.dispatch('search');

        return { results: computed(() => store.state.searchResults.slice(0, 50)) };
    },
};
</script>
