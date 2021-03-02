<template>
    <div class="card hoverable grey darken-3">
        <div v-if="d.img" class="card-image">
            <img :src="d.img.uri" />
        </div>
        <div class="card-content text-emphasis">
            <div class="card-title" style="margin-bottom: 0px">
                <EntityLink :d="d" :tooltip="false">
                    <span v-if="d.property !== undefined && d.property.display">
                        {{ d.property.display }}
                    </span>
                    <span v-else>
                        {{ d.name }}
                    </span>
                </EntityLink>

                <span class="category-label right" v-for="cat in d.categories" :key="cat">
                    <EntityLink :d="cat">
                        <span class="text-disabled">{{ cat.name }}</span>
                    </EntityLink>
                </span>
            </div>

            <table>
                <tbody>
                    <tr>
                        <td class="left" v-if="d.item && d.item.weight">{{ d.item.weight }} lb</td>
                        <td class="left" v-if="d.item && d.item.cost">
                            <span v-if="d.item.cost.pp">{{ d.item.cost.pp }} pp</span>
                            <span v-if="d.item.cost.gp">{{ d.item.cost.gp }} gp</span>
                            <span v-if="d.item.cost.ep">{{ d.item.cost.ep }} ep</span>
                            <span v-if="d.item.cost.sp">{{ d.item.cost.sp }} sp</span>
                            <span v-if="d.item.cost.cp">{{ d.item.cost.cp }} cp</span>
                        </td>
                        <td class="right" v-if="d.weapon">
                            {{ d.weapon.damage }} {{ d.weapon.type }}
                        </td>
                        <td class="right" v-if="d.armor">{{ d.armor.ac }} AC</td>
                    </tr>
                    <tr v-if="d.properties && d.properties.length > 0">
                        <td class="left" v-for="prop in d.properties" :key="prop">
                            <EntityLink :d="prop">
                                {{ prop.display }}
                            </EntityLink>
                        </td>
                    </tr>
                    <tr v-if="d.vehicle">
                        <td>
                            <div class="left" style="margin-right: 5px" v-if="d.vehicle.speed">
                                <span class="text-disabled">|</span>
                                Speed: {{ d.vehicle.speed }}
                            </div>
                            <div class="left" style="margin-right: 5px" v-if="d.vehicle.capacity">
                                <span class="text-disabled">|</span>
                                Capacity: {{ d.vehicle.capacity }}
                            </div>
                            <div class="left" style="margin-right: 5px" v-if="d.vehicle.workers">
                                <span class="text-disabled">|</span>
                                Workers: {{ d.vehicle.workers }}
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>

            <p class="card-p" v-if="d.tool">{{ d.tool.proficiency }}</p>

            <p class="card-p" v-if="d.description">{{ d.description }}</p>

            <p v-if="d.property && !d.description">
                {{ d.property.description }}
            </p>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        d: {
            required: true,
        },
    },
};
</script>
