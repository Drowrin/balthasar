<template>
    <div>
        <span v-for="req in requirements" :key="req" class="req">
            <span class="req-key" />

            <span v-if="req.level">Level {{ req.level }}</span>

            <span v-if="req.str">{{ req.str }} Strength</span>
            <span v-if="req.con">{{ req.con }} Constitution</span>
            <span v-if="req.dex">{{ req.dex }} Dexterity</span>
            <span v-if="req.int">{{ req.int }} Intelligence</span>
            <span v-if="req.wis">{{ req.wis }} Wisdom</span>
            <span v-if="req.cha">{{ req.cha }} Charisma</span>

            <span v-if="req.spellcasting">the ability to cast at least one spell</span>

            <EntityLink v-if="req.entity" :entity="req.entity" class="card-block" />
        </span>
    </div>
</template>

<style>
.req {
    display: inline-block;
}

.req-key {
    display: inline-block;
    text-align: right;
    margin: 0 5px;
}

.req-key::before {
    content: 'OR';
}

.req:first-child .req-key::before {
    content: 'Requires';
}

.req span:not(.req-key):not(:last-child)::after {
    content: ',';
    margin-right: 5px;
}
</style>

<script>
import EntityLink from './EntityLink.vue';

export default {
    name: 'Requirements',
    components: { EntityLink },
    props: {
        requirements: {
            type: Object,
            required: true,
        },
    },
    setup() {},
};
</script>
