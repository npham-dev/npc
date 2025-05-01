<script setup lang="ts">
import { RiPencilLine } from "@remixicon/vue";
import { PALETTE } from "./Canvas/Canvas";
</script>

<template>
    <div class="palette">
        <RiPencilLine />
        <button
            class="palette__button"
            :style="{ backgroundColor: PALETTE.BACKGROUND }"
        ></button>
        <button
            class="palette__button"
            :style="{ backgroundColor: PALETTE.FILL }"
        ></button>
    </div>
</template>

<style scoped>
.palette {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1rem;
}

.palette__button {
    border-radius: 100%;
    height: 2.5rem;
    width: 2.5rem;
    border: none;
    cursor: pointer;
}
</style>
