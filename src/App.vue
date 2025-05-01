<script setup lang="ts">
import Button from "./components/Button.vue";
import Canvas from "./components/Canvas/index.vue";
import PaletteSelector from "./components/PaletteSelector.vue";
</script>

<template>
    <div class="app">
        <h1>NPC</h1>
        <p>Generate and export space invader themed logos, built with Vue.</p>
        <div class="app__maker">
            <div class="app__maker__panel">
                <Canvas />
            </div>
            <div class="app__maker__panel">
                <PaletteSelector />
                <Button>sdf</Button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.app {
    padding: 1rem;
    max-width: 50rem;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
}

.app__maker {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    padding-top: 1rem;
}

.app__maker__panel {
    aspect-ratio: 1;
}
</style>
