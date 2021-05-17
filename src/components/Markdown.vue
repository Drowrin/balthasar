<template>
    <div :id="uid" ref="wrapper" v-html="source" />
</template>

<style>
.markdown-entity-link {
    padding: 2px;
    border-radius: 4px;
    border: 1px solid #292929;
    background: #343434;
    box-shadow: 1px 1px rgba(0, 0, 0, 0.2);
}

ul > li {
    list-style-type: disc !important;
}

ul {
    padding-left: 40px !important;
}
</style>

<script>
import { ref, onMounted, getCurrentInstance } from 'vue';
import tippy from 'tippy.js';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
    name: 'Markdown',
    props: {
        source: String,
    },
    setup() {
        const wrapper = ref(null);
        const store = useStore();
        const router = useRouter();

        const uid = `link${getCurrentInstance().uid}`;

        onMounted(() => {
            let nodes = wrapper.value.querySelectorAll('.markdown-entity-link');
            nodes.forEach((n) => {
                let id = n.getAttribute('data-entity-id');
                let entity = store.state.manifest[id];

                if (entity !== undefined) {
                    n.setAttribute('data-tippy-content', entity.description.rendered);

                    n.addEventListener('click', (event) => {
                        event.preventDefault();

                        const { altKey, ctrlKey, metaKey, shiftKey, button } = event;
                        if (metaKey || altKey || ctrlKey || shiftKey) return;
                        if (button !== undefined && button !== 0) return;

                        router.push(new URL(n.href).pathname);
                    });
                }
            });

            tippy(`#${uid} .markdown-entity-link`);
        });

        return {
            wrapper,
            uid,
        };
    },
};
</script>
