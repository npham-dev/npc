<script setup lang="ts">
import { PALETTE } from "./Canvas/Canvas";
import { store } from "../store";
</script>

<template>
    <div class="palette">
        <div class="palette__buttons view">
            <button
                v-for="color of [PALETTE.BACKGROUND, PALETTE.FILL]"
                class="palette__button"
                :style="{ backgroundColor: color }"
                @click="store.setCurrentColor(color)"
            >
                <div
                    class="palette__button__active"
                    v-if="color === store.currentColor"
                ></div>
            </button>
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
    border-radius: 0.5rem;
    display: grid;
    place-items: center;
    transition: filter 100ms ease;
}

.palette__button:hover {
    filter: brightness(0.9);
}

.palette__button__active {
    height: 0.75rem;
    width: 0.75rem;
    background-color: white;
    border-radius: 100%;
}
</style>
