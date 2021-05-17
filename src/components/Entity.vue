<template>
    <div style="margin: 20px">
        <Markdown
            v-if="d.type === 'article'"
            :source="d.article.rendered"
            style="max-width: 1000px; margin: auto"
        />
        <div v-else>{{ JSON.stringify(d, null, 2) }}</div>
    </div>
</template>

<script>
import { useStore } from 'vuex';

export default {
    props: {
        id: {
            type: String,
            required: true,
        },
    },
    setup(props) {
        const store = useStore();
        const manifest = store.state.manifest;
        const d = manifest[props.id];
        return { manifest, d };
    },
};
</script>
