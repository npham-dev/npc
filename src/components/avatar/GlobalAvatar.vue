<script setup lang="ts">
import Avatar from "./Avatar.vue";
import { store } from "../../store";
</script>

<template>
    <Avatar :grid="store.grid" />
</template>
