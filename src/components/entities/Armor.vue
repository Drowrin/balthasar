<template>
    <EntityCard :entity="entity" :page-block="!card" :categories="!card">
        <template #blocks>
            <ItemBlocks :entity="entity" />
            <span class="card-block">
                AC
                <span v-if="armorType === 'shield'">+</span>{{ entity.armor.ac }}
                <span v-if="armorType === 'medium'">+ Dexterity Modifier (Max 2)</span>
                <span v-if="armorType === 'light'">+ Dexterity Modifier</span>
            </span>
            <br />
            <EntityLink
                tooltip
                class="card-block"
                v-for="prop of entity.properties"
                :key="prop"
                :entity="prop"
            />
        </template>
    </EntityCard>
</template>

<script>
import EntityCard from './parts/EntityCard.vue';
import ItemBlocks from './parts/ItemBlocks.vue';
import EntityLink from './parts/EntityLink.vue';

export default {
    name: 'Armor',
    components: { EntityCard, ItemBlocks, EntityLink },
    props: {
        entity: {
            type: Object,
            required: true,
        },
        card: {
            type: Boolean,
            default: false,
        },
    },
    setup({ entity }) {
        let armorType = 'heavy';
        let cats = entity.categories.map((c) => c.id);

        if (cats.includes('armor.light.*')) armorType = 'light';
        if (cats.includes('armor.medium.*')) armorType = 'medium';
        if (cats.includes('armor.shield.*')) armorType = 'shield';

        return { armorType };
    },
};
</script>
