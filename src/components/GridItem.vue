<template>
    <div class="grid-item">
        <slot />
    </div>
</template>

<style>
.grid-item {
    padding: 5px;
    margin: 0;
    width: 100%;
    order: 1;
}
.grid-item > * {
    margin: 0;
}
@media (min-width: 1150px) {
    .grid-item {
        width: 50%;
    }
    .grid-item:nth-of-type(2n + 1) {
        order: 1;
    }
    .grid-item:nth-of-type(2n) {
        order: 2;
    }
}
@media (min-width: 1600px) {
    .grid-item {
        width: 33.333333333333336%;
    }
    .grid-item:nth-of-type(3n + 1) {
        order: 1;
    }
    .grid-item:nth-of-type(3n + 2) {
        order: 2;
    }
    .grid-item:nth-of-type(3n) {
        order: 3;
    }
}
@media (min-width: 2050px) {
    .grid-item {
        width: 25%;
    }
    .grid-item:nth-of-type(4n + 1) {
        order: 1;
    }
    .grid-item:nth-of-type(4n + 2) {
        order: 2;
    }
    .grid-item:nth-of-type(4n + 3) {
        order: 3;
    }
    .grid-item:nth-of-type(4n) {
        order: 4;
    }
}
@media (min-width: 2500px) {
    .grid-item {
        width: 20%;
    }
    .grid-item:nth-of-type(5n + 1) {
        order: 1;
    }
    .grid-item:nth-of-type(5n + 2) {
        order: 2;
    }
    .grid-item:nth-of-type(5n + 3) {
        order: 3;
    }
    .grid-item:nth-of-type(5n + 4) {
        order: 4;
    }
    .grid-item:nth-of-type(5n) {
        order: 5;
    }
}
</style>
