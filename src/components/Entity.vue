<template>
    {{ JSON.stringify(d, null, 2) }}
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
