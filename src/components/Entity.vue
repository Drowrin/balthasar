<template>
    {{ JSON.stringify(d, null, 2) }}
</template>

<script>
import { inject } from 'vue';

export default {
    props: {
        id: {
            type: String,
            required: true,
        },
    },
    setup(props) {
        const manifest = inject('manifest');
        const d = manifest.value.entities[props.id];

        console.log(manifest.value);
        console.log(d);

        return { manifest, d };
    },
};
</script>
