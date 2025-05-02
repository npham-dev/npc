<script setup lang="ts">
import Avatar from "./avatar/Avatar.vue";
import { ref } from "vue";
import { Canvas, PALETTE } from "./Canvas/Canvas";
import { store } from "../store";
import { RiDiceLine } from "@remixicon/vue";

const RANDOM_AVATARS_COUNT = 99;

const createRandomAvatars = () => new Array(RANDOM_AVATARS_COUNT)
        .fill(0)
        .map(() =>
            Canvas.randomGrid(),
        )

const randomAvatars = ref(createRandomAvatars());

const onClickRandom = () => {
    randomAvatars.value = createRandomAvatars();
};

const onClickAvatar = (grid: PALETTE[][]) => {
    store.value.setGrid(grid);
};
</script>

<template>
    <div class="randomize interactive" @click="onClickRandom">
        <RiDiceLine />
    </div>
    <Avatar class="avatar" v-for="grid in randomAvatars" :grid="grid" @click="store.setGrid(grid)" />
</template>

<style scoped>
.randomize {
    display: grid;
    place-items: center;
    border-radius: 0.5rem;
    cursor: pointer;
}

.avatar {
    border-radius: 0.5rem;
    overflow: hidden;
    cursor: pointer;
}
</style>
