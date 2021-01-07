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
    <div id="content" class="grey darken-4" @mousemove="mouseMove">
        <Suspense>
            <template #default>
                <RouterContent />
            </template>
            <template #fallback>
                <div class="valign-wrapper" style="height: 100vh">
                    <div class="container">
                        <div class="progress grey darken-4">
                            <div class="indeterminate orange" />
                        </div>
                    </div>
                </div>
            </template>
        </Suspense>
    </div>
</template>

<script>
import { provide, ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import RouterContent from './RouterContent.vue';

export default {
    name: 'App',
    components: {
        RouterContent,
    },
    setup() {
        const router = useRouter();
        const route = useRoute();

        const searchInput = ref('');
        const searchTerm = ref('');
        provide('searchTerm', searchTerm);

        // update search bar text with query string once it loads
        watch(
            () => route.query,
            (query) => {
                if (query.q) {
                    searchInput.value = query.q;
                    searchTerm.value = query.q;
                }
            }
        );

        /**
         * Called by submitting the search bar.
         */
        function search() {
            if (searchInput.value) {
                searchTerm.value = searchInput.value;
                // switch router to the search component and pass the search term as a query
                router.push(`/search?q=${searchTerm.value}`);
            }
        }

        var timer;
        const keydown = function () {
            clearTimeout(timer);
        };

        const keyup = function () {
            clearTimeout(timer);
            timer = setTimeout(() => (searchTerm.value = searchInput.value), 150);
        };

        const top = ref(0);
        const left = ref(0);

        const mouseMove = function (event) {
            left.value = event.clientX;
            top.value = event.clientY;
        };

        provide('mouseLeft', left);
        provide('mouseTop', top);

        return { search, searchInput, keydown, keyup, mouseMove };
    },
};
</script>
