<script setup lang="ts">
import Avatar from "./avatar/Avatar.vue";
import { ref } from "vue";
import { Canvas, PALETTE } from "./Canvas/Canvas";
import { store } from "../store";
import { eventBus } from "../eventBus";
import { RiDiceLine } from "@remixicon/vue";

const RANDOM_AVATARS_COUNT = 64;

const createRandomAvatars = () =>
    new Array(RANDOM_AVATARS_COUNT - 1).fill(0).map(() => Canvas.randomGrid());

const randomAvatars = ref(createRandomAvatars());

const onClickRandom = () => {
    randomAvatars.value = createRandomAvatars();
};

const onClickAvatar = (grid: PALETTE[][]) => {
    store.value.setGrid(grid);
    eventBus.emit("syncCanvas", grid);
};
</script>

<template>
    <div class="gallery">
        <div class="gallery__randomize interactive" @click="onClickRandom">
            <RiDiceLine />
        </div>
        <Avatar
            class="gallery__avatar"
            v-for="grid in randomAvatars"
            :grid="grid"
            @click="onClickAvatar(grid)"
        />
    </div>
</template>

<style scoped>
.gallery {
    display: grid;
    grid-template-columns: repeat(8, minmax(0, 1fr));
    gap: 0.5rem;
}

.gallery__randomize {
    display: grid;
    place-items: center;
    border-radius: 0.5rem;
    cursor: pointer;
}

.gallery__avatar {
    border-radius: 0.5rem;
    overflow: hidden;
    cursor: pointer;
    transition: filter 100ms ease;
}

.gallery__avatar:hover {
    filter: brightness(0.9);
}
</style>
