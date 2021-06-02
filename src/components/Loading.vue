<template>
    <div style="height: 100vh">
        <ProgressBar mode="indeterminate" class="loadingbar" />
    </div>
</template>

<style scoped>
.loadingbar {
    max-width: 720px;
    top: 50%;
    margin: auto;
}
</style>

<script>
import { watch, onBeforeMount } from 'vue';
import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router';

import ProgressBar from 'primevue/progressbar';

export default {
    name: 'Loading',
    components: { ProgressBar },
    setup() {
        const store = useStore();
        const router = useRouter();
        const route = useRoute();

        let to = route.query.to || '/';

        onBeforeMount(() => {
            if (store.state.manifest) router.push(to);
            store.watch(
                (state) => state.manifest,
                () => router.push(to)
            );
        });
    },
};
</script>
