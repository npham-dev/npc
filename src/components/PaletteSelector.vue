<script setup lang="ts">
import { PALETTE } from "./Canvas/Canvas";
import { store } from "../store";
</script>

<template>
    <div class="palette">
        <div class="palette__buttons view">
            <button
                v-for="color of [PALETTE.BACKGROUND, PALETTE.FILL]"
                :class="{
                    palette__button: true,
                    'palette__button--active': color === store.currentColor,
                }"
                :style="{ backgroundColor: color }"
                @click="store.setCurrentColor(color)"
            ></button>
        </div>
    </div>
</template>

<style scoped>
.palette {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1rem;
}

.palette__icon {
    width: 5.5rem;
    flex-shrink: 0;
    flex-direction: row;
    align-items: center;
    justify-content: end;
    gap: 0.5rem;
}

.palette__buttons {
    flex-direction: row;
    gap: 0.5rem;
    width: 100%;
    flex-grow: 1;
    flex-shrink: 1;
}

.palette__button {
    height: 2rem;
    width: 2rem;
    border: none;
    cursor: pointer;
    border: 1px solid #ccc;
    border-radius: 0.5rem;
    transition: shadow 100ms ease;
}

.palette__button:active {
    border-color: dodgerblue;
}

.palette__button--active {
    box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.25);
    border-color: dodgerblue;
}
</style>
