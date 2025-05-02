<template>
    <!-- fall through attributes https://vuejs.org/guide/components/attrs -->
    <button class="interactive view" v-bind="$attrs"><slot></slot></button>
</template>

<style scoped>
button {
    border-radius: 0.5rem;
    padding: 0 0.75rem;
    height: 2rem;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
}
</style>
