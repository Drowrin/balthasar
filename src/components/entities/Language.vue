<template>
    <EntityCard :entity="entity" :page-block="!card" :categories="!card">
        <template #blocks>
            <p v-if="entity.language.exotic">
                This language requires specific education in order to learn.
            </p>
            <span>
                Typical Speakers:
                <span v-for="speaker of entity.language.speakers" :key="speaker" class="card-block">
                    {{ speaker }}
                </span>
            </span>
            <span v-if="entity.language.script">
                Script:
                <EntityLink tooltip class="card-block" :entity="entity.language.script" />
            </span>
        </template>
    </EntityCard>
</template>

<script>
import EntityCard from './parts/EntityCard.vue';
import EntityLink from './parts/EntityLink.vue';

export default {
    name: 'Language',
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
