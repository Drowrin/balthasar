<template>
    <router-view />
</template>

<script>
import { provide, ref } from 'vue';
import axios from 'axios';

export default {
    async setup() {
        const manifest = ref({});

        if (localStorage.manifest) manifest.value = JSON.parse(localStorage.manifest);
        console.log(manifest.value);

        provide('manifest', manifest);

        const remoteHash = (await axios.get('http://localhost:3001/hash')).data;
        if (localStorage.hash != remoteHash) {
            await new Promise(r => setTimeout(r, 2000));
            manifest.value = (await axios.get('http://localhost:3001/')).data;
            localStorage.manifest = JSON.stringify(manifest.value);
            localStorage.hash = remoteHash;
        }
    }
}
</script>