<template>
    <router-link :id="id" :to="`/${d.id.replace('.', '/')}`">
        <slot />
    </router-link>
</template>

<script>
import { getCurrentInstance, onMounted } from 'vue';
import tippy from 'tippy.js';

export default {
    props: {
        d: {
            type: Object,
            validator: (d) => d.id !== undefined,
            required: true,
        },
        tooltip: {
            type: Boolean,
            default: true,
        },
    },
    setup(props) {
        const id = `link${getCurrentInstance().uid}`;

        onMounted(() => {
            if (props.tooltip) {
                tippy('#' + id, {
                    content: props.d.description.rendered,
                    ignoreAttributes: true,
                    interactive: true,
                });
            }
        });

        return { id };
    },
};
</script>
