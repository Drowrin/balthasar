<template>
    <div>
        <div class="card hoverable grey darken-3">
            <div class="card-content text-emphasis">
                <div class="card-title" style="margin-bottom: 0px;">
                    <EntityLink :d="d" :tooltip="false">
                        <span v-if="d.property !== undefined && d.property.display">
                            {{d.property.display}}
                        </span>
                        <span v-else>
                            {{d.name}}
                        </span>
                    </EntityLink>

                    <span class="category-label right" v-for="cat in d.categories" :key="cat">
                        <EntityLink :d="cat">
                            <span class="text-disabled">{{cat.name}}</span>
                        </EntityLink>
                    </span>
                </div>
                
                <table><tbody>
                    <tr>
                        <td class="left" v-if="d.equipment && d.equipment.weight">{{d.equipment.weight}}</td>
                        <td class="left" v-if="d.equipment && d.equipment.cost">{{d.equipment.cost}}</td>
                        <td class="right" v-if="d.weapon">{{d.weapon.damage}} {{d.weapon.type}}</td>
                        <td class="right" v-if="d.armor">{{d.armor.ac}} AC</td>
                    </tr>
                    <tr v-if="d.equipment && d.equipment.properties.length > 0">
                        <td class="left" v-for="prop in d.equipment.properties" :key="prop">
                            <EntityLink :d="prop">
                                {{prop.display}}
                            </EntityLink>
                        </td>
                    </tr>
                    <tr v-if="d.vehicle"><td>
                        <div class="left" style="margin-right: 5px;" v-if="d.vehicle.speed">
                            <span class="text-disabled">|</span>
                            Speed: {{d.vehicle.speed}}
                        </div>
                        <div class="left" style="margin-right: 5px;" v-if="d.vehicle.capacity">
                            <span class="text-disabled">|</span>
                            Capacity: {{d.vehicle.capacity}}
                        </div>
                        <div class="left" style="margin-right: 5px;" v-if="d.vehicle.workers">
                            <span class="text-disabled">|</span>
                            Workers: {{d.vehicle.workers}}
                        </div>
                    </td></tr>
                </tbody></table>

                <p class="card-p" v-if="d.tool">{{d.tool.proficiency}}</p>

                <p class="card-p" v-if="d.description">{{d.description}}</p>

                <p v-if="d.property && !d.description">{{d.property.description}}</p>
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