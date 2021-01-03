<template>
    <div v-if="d.args.length" class="row" style="margin-top: 5px; margin-bottom: 5px;">
        <span class="text-emphasis col s3">Args:</span>
        <span v-for="arg in d.args" :key="arg" class="col s3">{{arg}}</span>
    </div>
    <h6 v-if="d.display" class="text-emphasis">{{d.display}}</h6>
    <p>{{d.description}}</p>
</template>

<script>
export default {
    props: {
        d: {
            required: true,
        }
    }
}
</script>