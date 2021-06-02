<template>
    <EntityCard :entity="entity" :page-block="!card" :categories="!card">
        <template #blocks>
            <div>
                <span class="card-block">Level: {{ entity.spell.level || 'Cantrip' }}</span>
                <span class="card-block">School: {{ entity.spell.school }}</span>
            </div>

            <div>
                <span class="card-block">Cast Time: {{ entity.spell.castTime }}</span>
                <span class="card-block"> Range: {{ entity.spell.range }}ft </span>
                <span class="card-block" v-if="entity.spell.savingThrow">
                    Saving Throw: {{ entity.spell.savingThrow }}
                </span>
                <span class="card-block" v-if="entity.spell.attack">
                    Attack: {{ entity.spell.attack }}
                </span>
            </div>

            <div>
                <span class="card-block" v-if="entity.spell.concentration">Concentration</span>
                <span class="card-block" v-if="entity.spell.ritual">Ritual</span>
                <span class="card-block" v-if="entity.spell.components.verbal">Verbal</span>
                <span class="card-block" v-if="entity.spell.components.somatic">Somatic</span>
                <span class="card-block" v-if="entity.spell.components.material">Material</span>
            </div>
        </template>
    </EntityCard>
</template>

<script>
import EntityCard from './parts/EntityCard.vue';
import EntityLink from './parts/EntityLink.vue';

export default {
    name: 'Spell',
    components: { EntityCard, EntityLink },
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
};
</script>
