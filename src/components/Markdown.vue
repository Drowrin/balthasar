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
import { h, compile, ref, onMounted, getCurrentInstance } from 'vue';
import tippy from 'tippy.js';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
    name: 'Markdown',
    props: {
        source: {
            type: String,
            required: true,
        },
    },
    setup(props) {
        const store = useStore();
        const router = useRouter();

        const uid = `link${getCurrentInstance().uid}`;
        const selector = `#${uid} a[data-tippy-content]`;

        onMounted(() => {
            let nodes = document.querySelectorAll(selector);
            nodes.forEach((n) => {
                n.addEventListener('click', (event) => {
                    event.preventDefault();

                    const { altKey, ctrlKey, metaKey, shiftKey, button } = event;
                    if (metaKey || altKey || ctrlKey || shiftKey) return;
                    if (button !== undefined && button !== 0) return;

                    router.push(new URL(n.href).pathname);
                });
            });

            tippy(selector);
        });

        return () =>
            h('div', { id: uid }, [h(compile(store.state.markdown.makeHtml(props.source)))]);
    },
};
</script>
