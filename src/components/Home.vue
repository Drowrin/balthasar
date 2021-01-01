<template>
    <div>{{manifest}}</div>
</template>

<script>
import { inject } from 'vue';
export default {
    setup() {
        const manifest = inject('manifest');
        return { manifest };
    }
}
</script>