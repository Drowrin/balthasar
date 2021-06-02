<template>
    <EntityLink tooltip class="card-block" :entity="entity.proficiency.ability">
        Ability: {{ entity.proficiency.ability.name }}
    </EntityLink>
    <br />
    <EntityLink
        tooltip
        v-for="combo in entity.proficiency.combos"
        :key="combo"
        :entity="combo"
        class="card-block"
    >
        Skill: {{ combo.name }}
    </EntityLink>
</template>

<script>
import EntityLink from './EntityLink.vue';

export default {
    name: 'ProficiencyBlocks',
    components: { EntityLink },
    props: {
        entity: {
            type: Object,
            required: true,
        },
    },
};
</script>
