<template>
    <div>
        <div class="card hoverable grey darken-3">
            <div class="card-content text-emphasis">
                <span class="card-title" style="margin-bottom: 0px;">{{d.name}}</span>
                <WeaponBrief v-if="d.weapon" :d="d"/>
                <ArmorBrief v-if="d.armor" :d="d"/>
                <EquipmentBrief v-if="d.equipment" :d="d"/>
                <VehicleBrief v-if="d.vehicle" :d="d"/>
                <p class="card-p" v-if="d.description">{{d.description}}</p>
                <p class="card-p" v-if="d.tool">{{d.tool.proficiency}}</p>
                <PropertyBrief v-if="d.property" :d="d"/>
            </div>
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