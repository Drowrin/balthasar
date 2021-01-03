<template>
    <router-view/>
</template>

<script>
import { provide, ref } from 'vue';
import axios from 'axios';

export default {
    async setup() {
        const manifest = ref({});

        // load manifest from local storage if there is a manifest there
        if (localStorage.manifest) manifest.value = JSON.parse(localStorage.manifest);

        // make the manifest available to other components by injection
        provide('manifest', manifest);

        // get curent version hash from api
        const remoteHash = (await axios.get('http://localhost:3001/hash')).data;

        // if the hashes do not match, download new manifest and save both hash and manifest in local storage
        if (localStorage.hash != remoteHash) {
            manifest.value = (await axios.get('http://localhost:3001/')).data;
            localStorage.manifest = JSON.stringify(manifest.value);
            localStorage.hash = remoteHash;
        }
    }
}
</script>