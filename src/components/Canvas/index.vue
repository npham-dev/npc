<script setup lang="ts">
import invariant from "tiny-invariant";
import { onMounted, ref } from "vue";
import { Canvas } from "./Canvas";

const canvas = ref<HTMLCanvasElement>();
const canvasEngine = ref<Canvas>();

onMounted(() => {
    invariant(canvas.value, "expected canvas");

    const parentElement = canvas.value.parentElement;
    invariant(parentElement, "expected canvas parent");

    canvasEngine.value = new Canvas({
        size: parentElement.offsetWidth,
        canvas: canvas.value,
    });
});
</script>

<template>
    <canvas ref="canvas" class="canvas"></canvas>
</template>

<style scope></style>
