<template>
    <router-view/>
</template>

<script>
import { provide, ref } from 'vue';
import axios from 'axios';
import Fuse from 'fuse.js';

export default {
    async setup() {
        const manifest = ref({});
        const searchArray = ref([]);
        const fuse = ref(new Fuse());

        var searchIndex = {};

        // load manifest from local storage if there is a manifest there
        if (localStorage.manifest) manifest.value = JSON.parse(localStorage.manifest);
        if (localStorage.searchIndex) searchIndex = JSON.parse(localStorage.searchIndex);

        // make the manifest and search index available to other components by injection
        provide('manifest', manifest);
        provide('fuse', fuse);
        provide('searchArray', searchArray);

        // get curent version hash from api
        const remoteHash = (await axios.get('http://localhost:3001/hash')).data;

        // if the hashes do not match, save new data
        if (localStorage.hash != remoteHash) {
            console.log("Hashes do not match! Downloading new data...")
            manifest.value = (await axios.get('http://localhost:3001/')).data;
            searchIndex = (await axios.get("http://localhost:3001/index")).data;
            localStorage.manifest = JSON.stringify(manifest.value);
            localStorage.searchIndex = JSON.stringify(searchIndex);
            localStorage.hash = remoteHash;
        }

        searchArray.value = Object.values(manifest.value.entities);

        const options = {};
        fuse.value = new Fuse(searchArray.value, options, Fuse.parseIndex(searchIndex));
    }
}
</script>