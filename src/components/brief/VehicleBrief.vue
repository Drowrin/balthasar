<template>
    <div class="row">
        <span class="col s12">Speed: {{d.speed}}</span>
        <span class="col s12">Capacity: {{d.capacity}}</span>
        <span class="col s12">Workers: {{d.workers}}</span>
    </div>
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