<template>
    <div class="card hoverable grey darken-3">
        <div class="card-content text-emphasis">
            <span class="card-title" style="margin-bottom: 0px;">{{e.name}}</span>
            <div v-if="e.components.weapon">
                <span>{{e.components.weapon.damage}} {{e.components.weapon.type}}</span>
                <table><tbody><tr>
                    <td v-for="property in e.components.weapon.properties" :key="property">{{property.display}}</td>
                </tr></tbody></table>
            </div>
            <table v-if="e.components.armor"><tbody><tr>
                <td>AC {{e.components.armor.ac}}</td>
                <td v-for="property in e.components.armor.properties" :key="property">{{property.display}}</td>
            </tr></tbody></table>
            <table v-if="e.components.equipment"><tbody><tr>
                <td>{{e.components.equipment.weight}}</td>
                <td>{{e.components.equipment.cost}}</td>
                <td v-for="category in e.components.equipment.categories" :key="category">{{category.name}}</td>
            </tr></tbody></table>
            <div v-if="e.components.vehicle" class="row">
                <span class="col s12">Speed: {{e.components.vehicle.speed}}</span>
                <span class="col s12">Capacity: {{e.components.vehicle.capacity}}</span>
                <span class="col s12">Workers: {{e.components.vehicle.workers}}</span>
            </div>
            <p class="card-p" v-if="e.description">{{e.description}}</p>
            <p class="card-p" v-if="e.components.tool">{{e.components.tool.proficiency}}</p>
            <div v-if="e.components.property">
                <div v-if="e.components.property.args.length" class="row" style="margin-top: 5px; margin-bottom: 5px;">
                    <span class="text-emphasis col s3">Args:</span>
                    <span v-for="arg in e.components.property.args" :key="arg" class="col s3">{{arg}}</span>
                </div>
                <h6 v-if="e.components.property.display" class="text-emphasis">{{e.components.property.display}}</h6>
                <p>{{e.components.property.description}}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        data: {
            required: true,
        }
    },
    setup(props) {
        const e = props.data;
        console.log(e);
        return { e };
    },
}
</script>