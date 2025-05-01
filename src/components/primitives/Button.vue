<template>
    <!-- fall through attributes https://vuejs.org/guide/components/attrs -->
    <button class="interactive" v-bind="$attrs"><slot></slot></button>
</template>

<style scoped>
button {
    border-radius: 0.5rem;
    padding: 0 0.75rem;
    height: 2rem;
}
</style>
