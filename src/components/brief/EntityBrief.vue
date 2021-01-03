<template>
    <div class="card hoverable grey darken-3">
        <div class="card-content text-emphasis">
            <span class="card-title" style="margin-bottom: 0px;">{{d.name}}</span>
            <WeaponBrief v-if="d.components.weapon" :d="d.components.weapon"/>
            <ArmorBrief v-if="d.components.armor" :d="d.components.armor"/>
            <EquipmentBrief v-if="d.components.equipment" :d="d.components.equipment"/>
            <VehicleBrief v-if="d.components.vehicle" :d="d.components.vehicle"/>
            <p class="card-p" v-if="d.description">{{d.description}}</p>
            <p class="card-p" v-if="d.components.tool">{{d.components.tool.proficiency}}</p>
            <PropertyBrief v-if="d.components.property" :d="d.components.property"/>
        </div>
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