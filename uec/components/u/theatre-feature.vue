<script setup lang="ts">
defineProps<{ type: string; name?: string; text?: string }>()
</script>

<template>
    <icon v-if="type === 'icon'" :name="(name as string)" />

    <span v-else class="font-semibold text-sm cursor-default">
        {{ text }}
    </span>
</template>
