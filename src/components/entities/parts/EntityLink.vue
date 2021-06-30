<template>
    <router-link :id="id" :to="`/${entity.id.replaceAll('.', '/')}`">
        <slot>{{ entity.name }}</slot>
    </router-link>
</template>

<script>
import { getCurrentInstance, onMounted } from 'vue';
import tippy from 'tippy.js';

export default {
    props: {
        entity: {
            type: Object,
            validator: (entity) => entity.id !== undefined,
            required: true,
        },
        tooltip: {
            type: Boolean,
            default: false,
        },
    },
    setup(props) {
        const id = `link${getCurrentInstance().uid}`;

        onMounted(() => {
            if (props.tooltip) {
                tippy('#' + id, {
                    content: props.entity.brief,
                    ignoreAttributes: true,
                });
            }
        });

        return { id };
    },
};
</script>
