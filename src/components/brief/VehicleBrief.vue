<template>
    <div class="row">
        <span class="col s12">Speed: {{d.vehicle.speed}}</span>
        <span class="col s12">Capacity: {{d.vehicle.capacity}}</span>
        <span class="col s12">Workers: {{d.vehicle.workers}}</span>
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