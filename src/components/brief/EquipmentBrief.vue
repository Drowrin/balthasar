<template>
    <table><tbody><tr>
        <td>weight: {{d.equipment.weight}}</td>
        <td>value: {{d.equipment.cost}}</td>
        <td class="right">{{d.equipment.categories.map(cat => cat.name).join(" ")}}</td>
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