<template>
    <router-link :id="id" :to="`/${entity.id.replaceAll('.', '/')}`">
        <slot>{{ entity.name }}</slot>
    </router-link>
</template>

<script>
import { getCurrentInstance, onMounted } from 'vue';
import { useStore } from 'vuex';
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
        const store = useStore();
        const id = `link${getCurrentInstance().uid}`;

        onMounted(() => {
            if (props.tooltip && props.entity.brief) {
                tippy('#' + id, {
                    allowHTML: true,
                    content: store.state.markdown.makeHtml(props.entity.brief),
                    ignoreAttributes: true,
                });
            }
        });

        return { id };
    },
};
</script>
