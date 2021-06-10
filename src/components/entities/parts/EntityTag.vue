<template>
    <router-link :id="id" :to="`/${entity.id.replace('.', '/')}`">
        <Tag :value="entity.name" :severity="severity">
            <slot />
        </Tag>
    </router-link>
</template>

<script>
import { getCurrentInstance, onMounted } from 'vue';
import tippy from 'tippy.js';

import Tag from 'primevue/tag';

export default {
    props: {
        entity: {
            type: Object,
            validator: (e) => e.id !== undefined && e.name !== undefined,
            required: true,
        },
        severity: {
            type: String,
            default: 'info',
        },
        tooltip: {
            type: Boolean,
            default: true,
        },
    },
    components: { Tag },
    setup(props) {
        const id = `link${getCurrentInstance().uid}`;

        onMounted(() => {
            if (props.tooltip) {
                tippy('#' + id, {
                    content: props.entity.description,
                    ignoreAttributes: true,
                });
            }
        });

        return { id };
    },
};
</script>
