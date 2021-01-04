<template>
    <table><tbody><tr>
        <td>{{d.weapon.damage}} {{d.weapon.type}}</td>
        <td class="right">{{d.equipment.properties.map(prop => prop.display).join(" ")}}</td>
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