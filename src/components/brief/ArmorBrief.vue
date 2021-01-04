<template>
    <table><tbody><tr>
        <td>AC {{d.ac}}</td>
        <td v-for="property in d.properties" :key="property">{{property.display}}</td>
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