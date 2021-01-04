<template>
    <table><tbody><tr>
        <td>{{d.weight}}</td>
        <td>{{d.cost}}</td>
        <td class="right">{{d.categories.map(cat => cat.name).join(" ")}}</td>
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