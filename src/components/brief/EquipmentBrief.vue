<template>
    <table class="centered"><tbody><tr>
        <td>{{d.weight}}</td>
        <td>{{d.cost}}</td>
        <td v-for="category in d.categories" :key="category">{{category.name}}</td>
    </tr></tbody></table>
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