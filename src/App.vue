<template>
    <Sidebar />
    <ScrollPanel id="scrollpanel">
        <div id="content">
            <router-view :key="$route.fullPath + hash" />
        </div>
    </ScrollPanel>
</template>

<style>
#scrollpanel {
    margin-left: 250px;
    margin-bottom: 0px;
    height: 100vh;
}

#content {
    min-height: 100vh;
    background-color: var(--surface-0);
    border-right: 1px ridge var(--surface-400);
}

.p-scrollpanel {
    background-color: var(--surface-50);
}

.p-scrollpanel-content {
    padding-bottom: 0px;
    padding-top: 0px;
    padding-left: 0px;
    padding-right: 10px;
}
</style>

<style>
.tippy-content p {
    margin: 0px;
    font-weight: normal;
    line-height: 1.5;
}

.tippy-box {
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
    background-color: var(--surface-300);
}
</style>

<script>
import { onMounted, onUnmounted, computed } from 'vue';
import { useStore } from 'vuex';
import tippy from 'tippy.js';

import ScrollPanel from 'primevue/scrollpanel';

import Sidebar from './components/Sidebar.vue';

import * as Api from './api';

export default {
    name: 'App',
    components: { Sidebar, ScrollPanel },
    setup() {
        const store = useStore();

        // TODO: heartbeat system to test connection occasionally.
        let ws = Api.webSocket();

        ws.onmessage = function (event) {
            let msg = JSON.parse(event.data);

            console.log(`Hash update received: ${msg.hash}`);

            if (msg.hash != store.state.versionHash) store.dispatch('refreshData');
        };

        onUnmounted(() => ws.close());

        onMounted(() => {
            tippy.setDefaultProps({
                allowHTML: true,

                duration: 150,
                animation: 'shift-away-extreme',

                placement: 'bottom',
                popperOptions: {
                    modifiers: [
                        {
                            name: 'preventOverflow',
                            options: {
                                padding: 20,
                                boundary: document.querySelector('#content'),
                            },
                        },
                    ],
                },
            });
        });

        return { hash: computed(() => store.state.versionHash) };
    },
};
</script>
