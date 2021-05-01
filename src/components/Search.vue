<template>
    <FastGrid>
        <GridItem v-for="result in results" :key="result">
            <EntityBrief :d="result.item" />
        </GridItem>
    </FastGrid>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';

export default {
    setup() {
        const store = useStore();
        const route = useRoute();

        store.commit('searchTerm', route.query.q);

        store.dispatch('search');

        return { results: computed(() => store.state.searchResults) };
    },
};
</script>
