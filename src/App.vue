<script setup lang="ts">
import Button from "./components/primitives/Button.vue";
import Canvas from "./components/Canvas/index.vue";
import PaletteSelector from "./components/PaletteSelector.vue";
import { eventBus } from "./eventBus";
import Discord from "./components/previews/Discord.vue";
import Card from "./components/previews/Card.vue";
import Footer from "./components/Footer.vue";
import Gallery from "./components/Gallery.vue";
import { RiDiceLine, RiDownloadLine, RiEraserLine } from "@remixicon/vue";
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
                    <PaletteSelector />
                    <div class="view">
                        <Button @click="eventBus.emit('randomizeCanvas')">
                            <RiDiceLine size="14px" />
                            Random</Button
                        >
                        <Button @click="eventBus.emit('clearCanvas')">
                            <RiEraserLine size="14px" />
                            Clear</Button
                        >
                        <Button @click="eventBus.emit('exportCanvas')">
                            <RiDownloadLine size="14px" />
                            Export
                        </Button>
                    </div>
                </div>
            </div>
            <div class="app__maker__panel--right view">
                <Gallery />
            </div>
        </div>
        <div class="app__preview view">
            <h2>Preview</h2>
            <div class="app__preview__grid">
                <Discord />
                <Card />
            </div>
        </div>
        <Footer />
    </div>
</template>

<style scoped>
.app {
    padding: 0 1rem;
    max-width: 60rem;
    margin: 0 auto;
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
    margin-top: 0.5rem;
}

.app__maker__panel__options div {
    flex-direction: row;
    gap: 0.5rem;
}

.app__preview {
    padding-top: 1.5rem;
    flex-direction: column;
    gap: 0.5rem;
}

.app__preview__grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1rem;
}
</style>
