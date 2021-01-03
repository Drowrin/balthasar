<template>
    <table class="centered"><tbody><tr>
        <td>{{d.damage}} {{d.type}}</td>
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