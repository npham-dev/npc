<script setup lang="ts">
import Button from "./components/primitives/Button.vue";
import Canvas from "./components/Canvas/index.vue";
import PaletteSelector from "./components/PaletteSelector.vue";
import { emitter } from "./store";
import Checkbox from "./components/primitives/Checkbox.vue";
import Input from "./components/primitives/Input.vue";
import Discord from "./components/previews/Discord.vue";
</script>

<template>
    <div class="app view">
        <h1 class="app__header">NPC</h1>
        <p>Generate and export space invader themed logos, built with Vue.</p>

        <div class="app__maker">
            <div>
                <div class="app__maker__canvas">
                    <Canvas />
                </div>

                <div class="app__maker__panel__options view">
                    <div class="view">
                        <Button @click="emitter.emit('randomizeCanvas')"
                            >Randomize</Button
                        >
                        <Button @click="emitter.emit('clearCanvas')"
                            >Clear</Button
                        >
                    </div>
                    <PaletteSelector />
                </div>
            </div>
            <div class="app__maker__panel--right view">
                <Checkbox label="Export favicons" />
                <div class="view section" :style="{ paddingLeft: '1rem' }">
                    <Checkbox label="16x16" />
                    <Checkbox label="32x32" />
                </div>
                <Checkbox label="Export app icons" />
                <Checkbox label="Export manifest.json" />

                <Input label="Size" />

                <Button>Export</Button>
            </div>
        </div>
        <div class="app__preview">
            <Discord />
            <Discord />
            <Discord />
        </div>
    </div>
</template>

<style scoped>
.app {
    padding: 1rem;
    max-width: 50rem;
    margin: 0 auto;
}

.app__preview {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1rem;
    padding-top: 2rem;
}

.app__header {
    margin-top: 4rem;
}

.app__maker {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem;
    padding-top: 1rem;
}

.app__maker__canvas {
    width: 100%;
    aspect-ratio: 1;
}

.app__maker__panel--right {
    gap: 0.5rem;
}

.app__maker__panel__options {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-top: 0.25rem;
}

.app__maker__panel__options div {
    flex-direction: row;
    gap: 0.5rem;
}

.section {
    gap: 0.5rem;
}
</style>
