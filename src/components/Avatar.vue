<script setup lang="ts">
import { store } from "../store";
import { SIZE } from "./Canvas/Canvas";
</script>

<template>
    <div>
        <svg
            width="100%"
            height="100%"
            :viewBox="`0 0 ${SIZE} ${SIZE}`"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid meet"
        >
            <template v-for="(row, y) in store.grid">
                <rect
                    v-for="(color, x) in row"
                    :x="x"
                    :y="y"
                    :fill="color"
                    width="1"
                    height="1"
                />
            </template>
        </svg>
    </div>
</template>

<style scoped>
div {
    aspect-ratio: 1;
    width: 100%;
    height: 100%;
}

svg {
    width: 100%;
    height: 100%;
}
</style>
