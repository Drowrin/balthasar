<template>
    <div id="sidebar" class="row z-depth-2">
        <router-link to="/">
            <i class="medium hover-text material-icons center-align col s12">home</i>
        </router-link>
        <form @submit.prevent="search" class="col s12">
            <input
                class="col s12"
                v-model="searchInput"
                placeholder="search"
                @keydown="keydown"
                @keyup="keyup"
            />
        </form>
    </div>
    <div id="content" class="grey darken-4">
        <router-view :key="$route.fullPath" />
    </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import tippy from 'tippy.js';

export default {
    name: 'App',
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

        onMounted(() => {
            tippy.setDefaultProps({
                allowHTML: true,

                duration: 150,
                animation: 'shift-away-extreme',

                placement: 'bottom',
                popperOptions: {
                    modifiers: [
                        {
                            name: 'preventOverflow',
                            options: {
                                padding: 20,
                                boundary: document.querySelector('#content'),
                            },
                        },
                    ],
                },
            });
        });

        return { search, searchInput, keydown, keyup };
    },
};
</script>
