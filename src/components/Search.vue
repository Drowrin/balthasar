<template>
    <div v-if="$route.query.q && manifest.entities[$route.query.q]">
        {{ manifest.entities[$route.query.q] }}
    </div>
    <div v-else>nothing</div>
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