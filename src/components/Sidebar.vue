<template>
    <div id="sidebar">
        <div>
            <router-link to="/">
                <i class="pi pi-home" id="icon"/>
            </router-link>
        </div>
        <form @submit.prevent="search">
            <span class="p-float-label p-input-icon-right input-container">
                <InputText
                    id="searchbox"
                    type="text"
                    class="p-inputtext-sm"
                    v-model="searchInput"
                    @submit.prevent="search"
                    @keydown="keydown"
                    @keyup="keyup"
                />
                <label for="searchbox">Search</label>
                <i class="pi pi-search" />
            </span>
        </form>
    </div>
</template>

<style>
#sidebar {
    position: fixed;
    width: 100%;

    padding: 12.5px;
    display: flex;
    z-index: 2;

    background-color: var(--surface-50);
    border-bottom: 1px ridge var(--surface-400);
    box-shadow: 1px 0 2px rgba(0, 0, 0, 0.35), 1px 0 3px rgba(0, 0, 0, 0.2),
        1px 0 4px rgba(0, 0, 0, 0.15);
}

#icon {
    font-size: 40px;
    padding-right: 12.5px;
}

#searchbox {
    width: 100%;
}

.input-container {
    width: 100%;
}

form {
    width: 100%;
}
</style>

<script>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

import InputText from 'primevue/inputtext';

export default {
    name: 'Sidebar',
    components: { InputText },
    setup() {
        const router = useRouter();
        const store = useStore();

        const searchInput = computed({
            get: () => store.state.searchTerm,
            set: (val) => store.commit('searchTerm', val),
        });

        var timer;
        const keydown = function () {
            clearTimeout(timer);
        };

        const keyup = function () {
            clearTimeout(timer);
            timer = setTimeout(() => store.dispatch('search'), 150);
        };

        /**
         * Called by submitting the search bar.
         * Switch router to the search component and pass the search term as a query.
         */
        function search() {
            clearTimeout(timer);
            router.push({ path: '/search', query: { q: searchInput.value } });
        }

        store.dispatch('loadData');

        return { search, searchInput, keydown, keyup };
    },
};
</script>
