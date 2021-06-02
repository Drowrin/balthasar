<template>
    <div>
        <Fieldset legend="Core Traits" v-if="hasCoreTraits">
            <Grid :gutter="10" compact>
                <GridItem>
                    <Card>
                        <template #title>Appearance</template>
                        <template #content>
                            {{ lineage.appearance }}
                        </template>
                    </Card>
                </GridItem>
                <GridItem v-if="!!lineage.size || !!lineage.stature">
                    <Card>
                        <template #title>Size</template>
                        <template #content>
                            <p v-if="!!lineage.size">
                                Your size category is
                                <span style="text-transform: capitalize">
                                    {{ lineage.size }}.
                                </span>
                            </p>

                            <p v-if="!!lineage.stature?.height">
                                Your height is between
                                {{ lineage.stature.height[0] }} and
                                {{ lineage.stature.height[1] }} feet.
                            </p>
                            <p v-if="!!lineage.stature?.weight">
                                Your weight is between
                                {{ lineage.stature.weight[0] }} and
                                {{ lineage.stature.weight[1] }} lb.
                            </p>
                        </template>
                    </Card>
                </GridItem>
                <GridItem v-if="!!lineage.languages">
                    <Card>
                        <template #title>Languages</template>
                        <template #content>
                            You are taught the following languages as you are raised:
                            <EntityLink
                                tooltip
                                class="card-block"
                                v-for="language in lineage.languages"
                                :key="language"
                                :entity="language"
                            />
                        </template>
                    </Card>
                </GridItem>
                <GridItem v-if="!!lineage.age">
                    <Card>
                        <template #title>Age</template>
                        <template #content>
                            <p>
                                You reach physical maturity and stop growing at
                                {{ lineage.age.maturiy }}.
                            </p>
                            <p>You are considered an adult at {{ lineage.age.adulthood }}.</p>
                            <p>Your expected lifespan is {{ lineage.age.lifespan }} years.</p>
                        </template>
                    </Card>
                </GridItem>
            </Grid>
        </Fieldset>

        <Fieldset legend="Minor Traits" v-if="hasMinorTraits">
            <Grid :gutter="10" compact>
                <GridItem v-for="trait in lineage.minorTraits" :key="trait">
                    <Entity :id="trait.id" card />
                </GridItem>
            </Grid>
        </Fieldset>

        <Fieldset legend="Major Traits" v-if="hasMajorTraits">
            <Grid :gutter="10" compact>
                <GridItem v-for="trait in lineage.majorTraits" :key="trait">
                    <Entity :id="trait.id" card />
                </GridItem>
            </Grid>
        </Fieldset>

        <Fieldset legend="Heritage Traits" v-if="hasHeritageTraits">
            <Grid :gutter="10" compact>
                <GridItem v-for="trait in lineage.heritageTraits" :key="trait">
                    <Entity :id="trait.id" card />
                </GridItem>
            </Grid>
        </Fieldset>
    </div>
</template>

<script>
import { computed } from 'vue';

import Card from 'primevue/card';
import Fieldset from 'primevue/fieldset';

import EntityCard from './EntityCard.vue';
import EntityLink from './EntityLink.vue';
import TitleRow from './TitleRow.vue';
import Grid from '../../Grid.vue';
import GridItem from '../../GridItem.vue';

export default {
    name: 'LineageDetails',
    components: { EntityCard, EntityLink, Grid, GridItem, TitleRow, Card, Fieldset },
    props: {
        lineage: {
            type: Object,
            required: true,
        },
    },
    setup(props) {
        let hasCoreTraits = computed(
            () =>
                !!props.lineage.appearance ||
                !!props.lineage.size ||
                !!props.lineage.stature ||
                !!props.lineage.languages ||
                !!props.lineage.age
        );

        let hasMinorTraits = computed(
            () => !!props.lineage.minorTraits && props.lineage.minorTraits.length > 0
        );
        let hasMajorTraits = computed(
            () => !!props.lineage.majorTraits && props.lineage.majorTraits.length > 0
        );
        let hasHeritageTraits = computed(
            () => !!props.lineage.heritageTraits && props.lineage.heritageTraits.length > 0
        );

        return {
            hasCoreTraits,
            hasMinorTraits,
            hasMajorTraits,
            hasHeritageTraits,
        };
    },
};
</script>
