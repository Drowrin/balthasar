<template>
    <div class="card grey darken-3">
        <span class="card-title">{{e.name}}</span>
        <div class="card-content">
            <p>{{e}}</p>
        </div>
    </div>
</template>

<script>
import { inject } from 'vue';

export default {
    props: {
        data: {
            required: true,
        }
    },
    setup(props) {
        const e = props.data;
        console.log(e);
        return { e };
    },
}
</script>