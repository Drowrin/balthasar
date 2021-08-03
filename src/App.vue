<template>
    <Sidebar />
    <ScrollPanel id="scrollpanel">
        <div id="content">
            <router-view :key="$route.fullPath + hash" />
        </div>
    </ScrollPanel>
</template>

<style>
#app {
    display: flex;
    flex-direction: column;
}

#scrollpanel {
    margin-top: 69px;
    padding: 12.5px 24px 24px 24px;
    background-color: var(--surface-0);
}

.p-scrollpanel {
    background-color: var(--surface-50);
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
import { onMounted, onUnmounted, computed, watch, provide } from 'vue';
import { useStore } from 'vuex';
import tippy from 'tippy.js';

import ScrollPanel from 'primevue/scrollpanel';

import Sidebar from './components/Sidebar.vue';

import * as Api from './api';

export default {
    name: 'App',
    components: { Sidebar, ScrollPanel },
    setup() {
        provide('entityBrief', false);

        const store = useStore();

        let ws = Api.webSocket();
        console.log(`Attempting to connect to WebSocket at ${Api.WS}`);

        const stopWatching = watch(
            () => ws.readyState,
            (readyState) => {
                if (readyState == 1) {
                    console.log(`Successfully connected to WebSocket at ${Api.WS}`);
                    stopWatching();
                }
            }
        );

        ws.onerror = function (event) {
            console.log('Could not establish WebSocket communication with Casper:');
            console.error(event);
            stopWatching();
        };

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
