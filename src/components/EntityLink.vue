<template>
    <router-link
        :id="`link${uid}`"
        :to="`/entity/${d.id}`"
        @mouseenter="isShowing = true"
        @mouseleave="isShowing = false"
    >
        <slot />
    </router-link>
    <teleport to="#popup-target">
        <div
            v-show="isShowing && tooltip"
            class="popover card grey darken-3"
            :style="`left: ${left}px !important; top: ${top}px !important;`"
        >
            <div class="card-content">
                <span class="card-title text-emphasis">{{ d.display || d.name || d.id }}</span>
                <p>{{ d.description }}</p>
            </div>
        </div>
    </teleport>
</template>

<script>
import { ref, getCurrentInstance, inject } from 'vue';

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
        const uid = getCurrentInstance().uid;
        const isShowing = ref(false);

        const top = inject('mouseTop');
        const left = inject('mouseLeft');

        return { isShowing, uid, top, left };
    },
};
</script>
