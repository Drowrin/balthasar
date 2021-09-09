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
            let links = document.querySelectorAll(selector);
            links.forEach((el) => {
                let id = el.getAttribute('data-id');
                let entity = store.state.manifest[id];
                if (entity?.brief) {
                    tippy(el, {
                        allowHTML: true,
                        content: store.state.markdown.makeHtml(entity?.brief),
                    });
                }
            });
        });

        return () =>
            h('div', { id: uid, class: 'markdown' }, [
                h(compile(store.state.markdown.makeHtml(props.source))),
            ]);
    },
};
</script>
