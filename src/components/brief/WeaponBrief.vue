<template>
    <table><tbody><tr>
        <td>{{d.damage}} {{d.type}}</td>
        <td class="right">{{d.properties.map(prop => prop.display).join(" ")}}</td>
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