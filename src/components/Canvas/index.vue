<script setup lang="ts">
import invariant from "tiny-invariant";
import { onMounted, onUnmounted, ref, shallowRef, watchEffect } from "vue";
import { Canvas } from "./Canvas";
import { emitter, store } from "../../store";

const canvas = ref<HTMLCanvasElement>();
const canvasEngine = shallowRef<Canvas>();

const randomizeCanvas = () => {
    canvasEngine.value?.randomize();
};

const clearCanvas = () => {
    canvasEngine.value?.clear();
};

watchEffect(() => {
    canvasEngine.value?.setCurrentColor(store.value.currentColor);
});

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

    emitter.on("randomizeCanvas", randomizeCanvas);
    emitter.on("clearCanvas", clearCanvas);
});

onUnmounted(() => {
    if (canvasEngine.value) {
        canvasEngine.value.unmount();
        canvasEngine.value = undefined;
    }

    emitter.off("randomizeCanvas", randomizeCanvas);
    emitter.off("clearCanvas", clearCanvas);
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
