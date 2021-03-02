<template>
    <router-view />
</template>

<script>
import { provide, ref } from 'vue';
import axios from 'axios';

export default {
    async setup() {
        const manifest = ref({});

        var searchWorker = new Worker('/search.worker.js');

        var searchIndex = {};

        // load manifest from local storage if there is a manifest there
        const mdata = localStorage.casper;
        if (mdata) {
            const data = JSON.parse(mdata);
            manifest.value = data.manifest;
            searchIndex = data.index;
        }

        // make the manifest and search index available to other components by injection
        provide('manifest', manifest);
        provide('searchWorker', searchWorker);

        // get curent version hash from api
        const remoteHash = (await axios.get('http://localhost:3001/hash')).data;

        // if the hashes do not match, save new data
        if (localStorage.hash != remoteHash) {
            console.log('Hashes do not match! Downloading new data...');

            const data = (await axios.get('http://localhost:3001/')).data;

            manifest.value = data.manifest;
            searchIndex = data.index;

            localStorage.casper = JSON.stringify(data);
            localStorage.hash = remoteHash;
        }

        const options = {
            threshold: 0.55,
            includeMatches: true,
            includeScore: true,
            useExtendedSearch: true,
        };

        searchWorker.postMessage({
            fuse: {
                values: JSON.stringify(Object.values(manifest.value)),
                options: options,
                index: searchIndex,
            },
        });
    },
};
</script>
