<script setup lang="ts">
defineProps<{
    label?: string;
}>();
</script>

<template>
    <div class="checkbox">
        <input :id="label" type="checkbox" v-bind="$attrs" />
        <label :for="label" v-if="label">
            {{ label }}
        </label>
    </div>
</template>

<style scoped>
.checkbox {
    width: 100%;
    justify-content: start;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

input {
    border-radius: 0.5rem;
    height: 1.25rem;
    width: 1.25rem;
    cursor: pointer;
    flex-grow: 0;
    flex-shrink: 0;
}

label {
    width: 100%;
    flex-shrink: 1;
    flex-grow: 1;
}
</style>
