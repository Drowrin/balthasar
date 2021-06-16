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

.tippy-content ul,
.tippy-content ol {
    padding-left: 10px;
}
</style>

<script>
import { h, compile, onMounted, getCurrentInstance } from 'vue';
import tippy from 'tippy.js';
import { useStore } from 'vuex';

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

        const uid = `link${getCurrentInstance().uid}`;
        const selector = `#${uid} a[data-id]`;

        onMounted(() => {
            tippy(selector, {
                allowHTML: true,
                content(el) {
                    let id = el.getAttribute('data-id');
                    return store.state.markdown.makeHtml(store.state.manifest[id]?.description);
                },
            });
        });

        return () =>
            h('div', { id: uid, class: 'markdown' }, [
                h(compile(store.state.markdown.makeHtml(props.source))),
            ]);
    },
};
</script>
