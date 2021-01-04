<template>
    <h6 v-if="d.property.display" class="text-emphasis">{{d.property.display}}</h6>
    <p>{{d.property.description}}</p>
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