<script setup lang="ts">
import Avatar from '../Avatar.vue';
import { PALETTE } from '../Canvas/Canvas';

const bgColor = PALETTE.FILL;
</script>

<template>
    <div class="card view">
        <div class="card__avatar">
            <Avatar />
        </div>
        <div class="card__content"> 
            <h1>Nathan Pham</h1>
            <p>Software Engineer</p>

            <div class="card__content__pii">
                <p>(000) 000 - 0000</p>
                <p>A location in the world</p>
                <p>natmfat@gmail.com</p>
            </div>
        </div>
        <div class="card__graphic">
            <div class="card__graphic__cell card__graphic__cell--active"></div>
            <div class="card__graphic__cell"></div>

            <div class="card__graphic__cell"></div>
            <div class="card__graphic__cell card__graphic__cell--active"></div>

            <div class="card__graphic__cell card__graphic__cell--active"></div>
            <div class="card__graphic__cell"></div>
        </div>
    </div>
</template>

<style scoped>
.card {
    grid-column: span 2;
    width: 100%;
    border-radius: 0.5rem;
    flex-direction: row;
    background-color: #eee;
    align-items: center; 
    padding: 0 3rem;
    gap: 3rem;
    position: relative;
    overflow: hidden;
}

.card__graphic {
    --cell-size: 2rem;
    --grid-size: 2;

    position: absolute;
    bottom: 0;
    right: 0;
    width: calc(var(--cell-size) * var(--grid-size));
    display: grid;
    grid-template-columns: repeat(var(--grid-size), minmax(0, 1fr));
    grid-auto-rows: var(--cell-size);
}

.card__graphic__cell {
    width: var(--cell-size);
    height: var(--cell-size);
}

.card__graphic__cell--active {
    background-color: v-bind(bgColor);
}

.card__avatar {
    height: 5rem;
    width: 5rem;
    border-radius: 0.5rem;
    overflow: hidden;
}

.card__content > h1 {
    color: #333;
    font-size: 1.75rem;
}

.card__content > p {
    text-transform: uppercase;
    font-size: 0.875rem;
    color: #666;
}

.card__content__pii {
    padding-top: 1.5rem;
    font-size: 0.875rem;
    line-height: 1.3rem;
}

</style>