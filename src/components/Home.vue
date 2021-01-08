<template>
    <div>{{ manifest }}</div>
</template>

<script>
import { inject } from 'vue';

export default {
    setup() {
        const manifest = inject('manifest');
        const searchTerm = inject('searchTerm');

        searchTerm.value = '';

        console.log(manifest);

        return { manifest };
    },
};
</script>
