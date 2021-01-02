<template>
    <div id="sidebar" class="row">
        <router-link to="/">
            <i class="medium material-icons center-align col s12">home</i>
        </router-link>
        <form @submit.prevent="search" class="col s12">
            <input class="col s12" v-model="searchTerm" placeholder="search"/>
        </form>

    </div>
    <router-view id="content" class="grey darken-4"/>
</template>

<script>
import { provide, ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import axios from 'axios';

export default {
    async setup() {
        const router = useRouter();
        const route = useRoute();

        const manifest = ref({});
        const searchTerm = ref("");

        // update search bar text with query string once it loads
        watch(
            () => route.query,
            query => {
                if (query.q)
                    searchTerm.value = query.q;
            }
        )

        // load manifest from local storage if there is a manifest there
        if (localStorage.manifest) manifest.value = JSON.parse(localStorage.manifest);

        // make the manifest and search term available to other components by injection
        provide('manifest', manifest);
        provide('searchTerm', searchTerm);

        // get curent version hash from api
        const remoteHash = (await axios.get('http://localhost:3001/hash')).data;

        // if the hashes do not match, download new manifest and save both hash and manifest in local storage
        if (localStorage.hash != remoteHash) {
            manifest.value = (await axios.get('http://localhost:3001/')).data;
            localStorage.manifest = JSON.stringify(manifest.value);
            localStorage.hash = remoteHash;
        }

        /**
         * Called by submitting the search bar.
         */
        function search() {
            if (searchTerm.value)
                // switch router to the search component and pass the search term as a query
                router.push(`/search?q=${searchTerm.value}`);
        }

        return { manifest, searchTerm, search };
    }
}
</script>