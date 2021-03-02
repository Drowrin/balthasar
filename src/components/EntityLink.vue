<template>
    <router-link :id="id" :to="`/entity/${d.id}`">
        <slot />
    </router-link>
</template>

<style>
@import 'tippy.js/animations/shift-away-extreme.css';
</style>

<script>
import { getCurrentInstance } from 'vue';
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
    setup() {
        const id = `link${getCurrentInstance().uid}`;

        return { id };
    },
    mounted() {
        if (this.tooltip) {
            tippy(`#link${getCurrentInstance().uid}`, {
                allowHTML: true,
                interactive: true,
                ignoreAttributes: true,

                duration: 150,
                animation: 'shift-away-extreme',

                placement: 'bottom',
                popperOptions: {
                    modifiers: [
                        {
                            name: 'preventOverflow',
                            options: {
                                padding: 20,
                                boundary: document.querySelector('#content'),
                            },
                        },
                    ],
                },

                content: `<div class="card grey darken-4 z-depth-5">
                    <div class="card-content"><span class="text-emphasis">${this.d.description}</span></div>
                </div>`,
            });
        }
    },
};
</script>
