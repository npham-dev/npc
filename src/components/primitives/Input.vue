<script setup lang="ts">
defineProps<{
    label?: string;
}>();
</script>

<template>
    <div class="input">
        <label v-if="label">
            {{ label }}
        </label>
        <input class="interactive" type="number" v-bind="$attrs" />
    </div>
</template>

<style scoped>
.input {
    display: flex;
    align-items: center;
    gap: 1rem;
    width: 100%;
}

label {
    width: 4rem;
    text-align: right;
    flex-shrink: 0;
}

input {
    border-radius: 0.5rem;
    padding: 0 0.75rem;
    height: 2rem;
    width: 100%;
    flex-shrink: 1;
    flex-grow: 1;
}
</style>
