<template>
    <div class="valign-wrapper" style="height: 100vh">
        <div class="container">
            <div class="progress grey darken-4">
                <div class="indeterminate orange" />
            </div>
        </div>
    </div>
</template>

<script>
import { watch, onBeforeMount } from 'vue';
import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router';

export default {
    name: 'Loading',
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
