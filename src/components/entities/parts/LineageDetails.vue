<template>
    <div>
        <Fieldset legend="Core Traits" v-if="hasCoreTraits">
            <Grid :gutter="10" compact>
                <GridItem
                    v-if="lineage.limited"
                    :class="passIf(lineage.limited !== delta?.limited)"
                >
                    <Card>
                        <template #title>Limited Lineage</template>
                        <template #content>
                            <p>This lineage can't be a Single Lineage.</p>
                            <p>
                                Additionally, a Dual Lineage can contain no more than one lineage
                                with this trait.
                            </p>
                        </template>
                    </Card>
                </GridItem>

                <GridItem
                    v-if="!!lineage.appearance"
                    :class="passIf(lineage.appearance !== delta?.appearance)"
                >
                    <Card>
                        <template #title>Appearance</template>
                        <template #content>
                            {{ lineage.appearance }}
                        </template>
                    </Card>
                </GridItem>
                <GridItem
                    v-if="!!lineage.size || !!lineage.stature"
                    :set="
                        (sizePass =
                            !delta?.size && !delta?.stature?.height && !delta?.stature?.height)
                    "
                    :class="passIf(sizePass)"
                >
                    <Card>
                        <template #title>Size</template>
                        <template #content>
                            <p v-if="!!lineage.size" :class="passIf(!sizePass && !delta?.size)">
                                Your size category is
                                <span style="text-transform: capitalize">
                                    {{ lineage.size }}.
                                </span>
                            </p>

                            <p
                                v-if="!!lineage.stature?.height?.mult"
                                :class="passIf(!sizePass && !delta?.stature?.height)"
                            >
                                You are
                                {{ multToText(lineage.stature.height.mult) }}
                                as tall as your other lineage.
                            </p>
                            <p
                                v-else-if="!!lineage.stature?.height"
                                :class="passIf(!sizePass && !delta?.stature?.height)"
                            >
                                Your height is between
                                {{ lineage.stature.height.low }} and
                                {{ lineage.stature.height.high }} feet.
                            </p>

                            <p
                                v-if="!!lineage.stature?.weight?.mult"
                                :class="passIf(!sizePass && !delta?.stature?.weight)"
                            >
                                You weigh
                                {{ multToText(lineage.stature.weight.mult) }}
                                as much as your other lineage.
                            </p>
                            <p
                                v-else-if="!!lineage.stature?.weight"
                                :class="passIf(!sizePass && !delta?.stature?.weight)"
                            >
                                Your weight is between
                                {{ lineage.stature.weight.low }} and
                                {{ lineage.stature.weight.high }} lb.
                            </p>
                        </template>
                    </Card>
                </GridItem>
                <GridItem v-if="!!lineage.languages" :class="passIf(!delta?.languages)">
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
                <GridItem v-if="!!lineage.age" :class="passIf(!delta?.age)">
                    <Card>
                        <template #title>Age</template>
                        <template #content>
                            <p v-if="typeof lineage.age.maturity === 'string'">
                                You mature
                                {{ multToText(lineage.age.maturity) }}
                                as fast as your other lineage.
                            </p>
                            <p v-else>
                                You reach physical maturity and stop growing at
                                {{ lineage.age.maturity }}.
                            </p>

                            <p v-if="typeof lineage.age.adulthood === 'string'">
                                You reach adulthood
                                {{ multToText(lineage.age.adulthood) }}
                                as soon as your other lineage.
                            </p>
                            <p v-else>
                                You are considered an adult at
                                {{ lineage.age.adulthood }}.
                            </p>

                            <p v-if="typeof lineage.age.lifespan === 'string'">
                                You live
                                {{ multToText(lineage.age.lifespan) }}
                                as long as your other lineage.
                            </p>
                            <p v-else>
                                Your expected lifespan is
                                {{ lineage.age.lifespan }}.
                            </p>
                        </template>
                    </Card>
                </GridItem>
            </Grid>
        </Fieldset>

        <Fieldset legend="Minor Traits" v-if="hasMinorTraits">
            <Grid :gutter="10" compact>
                <GridItem
                    v-for="trait in lineage.minorTraits"
                    :key="trait"
                    :class="passIf(!delta?.minorTraits?.map((t) => t.id).includes(trait.id))"
                >
                    <Entity :id="trait.id" card />
                </GridItem>
            </Grid>
        </Fieldset>

        <Fieldset legend="Major Traits" v-if="hasMajorTraits">
            <Grid :gutter="10" compact>
                <GridItem
                    v-for="trait in lineage.majorTraits"
                    :key="trait"
                    :class="passIf(!delta?.majorTraits?.map((t) => t.id).includes(trait.id))"
                >
                    <Entity :id="trait.id" card />
                </GridItem>
            </Grid>
        </Fieldset>

        <Fieldset legend="Heritage Traits" v-if="hasHeritageTraits">
            <Grid :gutter="10" compact>
                <GridItem
                    v-for="trait in lineage.heritageTraits"
                    :key="trait"
                    :class="passIf(!delta?.heritageTraits?.map((t) => t.id).includes(trait.id))"
                >
                    <Entity :id="trait.id" card />
                </GridItem>
            </Grid>
        </Fieldset>
    </div>
</template>

<style>
.passthrough .p-card,
p.passthrough {
    opacity: 0.72;
    border: 1.5px dashed var(--surface-900);
}
.passthrough .p-card-title::before,
p.passthrough::before {
    content: var(--origin-text);
}
</style>

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
        delta: {
            type: Object,
            required: false,
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

        function passIf(b) {
            return !!props.delta && b ? 'passthrough' : '';
        }

        function multToText(m) {
            switch (m) {
                case 'x1':
                    return 'just';
                case 'x0.5':
                    return 'half';
                case 'x2':
                    return 'twice';
                default:
                    return m.substr(1) + 'x';
            }
        }

        return {
            passIf,
            multToText,
            hasCoreTraits,
            hasMinorTraits,
            hasMajorTraits,
            hasHeritageTraits,
        };
    },
};
</script>
