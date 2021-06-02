<template>
    <div :id="uid" ref="wrapper" v-html="source" />
</template>

<style>
h3,
h4,
h5,
h6 {
    margin: 20px 0px 0px 0px;
}

p {
    margin: 0px 0px 10px 0px;
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
            let nodes = wrapper.value.querySelectorAll('.entity-link');
            nodes.forEach((n) => {
                let id = n.getAttribute('data-entity-id');
                let entity = store.state.manifest[id];

                if (entity !== undefined) {
                    n.setAttribute('data-tippy-content', entity.description.rendered);

                    n.classList.add('markdown-tippy');
                }

                n.classList.add('card-block');
                n.style.marginRight = 0; // Override .card-block margin so it fits better in text blocks

                n.addEventListener('click', (event) => {
                    event.preventDefault();

                    const { altKey, ctrlKey, metaKey, shiftKey, button } = event;
                    if (metaKey || altKey || ctrlKey || shiftKey) return;
                    if (button !== undefined && button !== 0) return;

                    router.push(new URL(n.href).pathname);
                });
            });

            tippy(`#${uid} .markdown-tippy`);
        });

        return {
            wrapper,
            uid,
        };
    },
};
</script>
