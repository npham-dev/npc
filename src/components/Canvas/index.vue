<script setup lang="ts">
import invariant from "tiny-invariant";
import { onMounted, onUnmounted, ref, shallowRef, watchEffect } from "vue";
import { Canvas } from "./Canvas";
import { store } from "../../store";
import { eventBus } from "../../eventBus";

const canvas = ref<HTMLCanvasElement>();
const canvasEngine = shallowRef<Canvas>();

watchEffect(() => {
    canvasEngine.value?.setCurrentColor(store.value.currentColor);
});

const randomizeCanvas = () => {
    canvasEngine.value?.randomize();
};

const clearCanvas = () => {
    canvasEngine.value?.clear();
};

const exportCanvas = () => {
    canvasEngine.value?.export();
};

onMounted(() => {
    invariant(canvas.value, "expected canvas");

    const parentElement = canvas.value.parentElement;
    invariant(parentElement, "expected canvas parent");

    canvasEngine.value = new Canvas({
        size: parentElement.offsetWidth,
        canvas: canvas.value,

        updateGrid: (...args) => {
            store.value.updateGrid(...args);
        },
        setGrid: (...args) => {
            store.value.setGrid(...args);
        },
    });

    eventBus.on("randomizeCanvas", randomizeCanvas);
    eventBus.on("clearCanvas", clearCanvas);
    eventBus.on("exportCanvas", exportCanvas);
});

onUnmounted(() => {
    if (canvasEngine.value) {
        canvasEngine.value.unmount();
        canvasEngine.value = undefined;
    }

    eventBus.off("randomizeCanvas", randomizeCanvas);
    eventBus.off("clearCanvas", clearCanvas);
    eventBus.off("exportCanvas", exportCanvas);
});
</script>

<template>
    <canvas ref="canvas" class="canvas"></canvas>
</template>

<style scope>
.canvas {
    border-radius: 0.5rem;
    cursor: pointer;
}
</style>
