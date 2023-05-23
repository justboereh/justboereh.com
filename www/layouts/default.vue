<script setup>
import '@unocss/reset/tailwind.css'
</script>

<template>
    <main>
        <slot />
    </main>
</template>

<style>
body {
    font-family: var(--font-family);
    background-color: var(--surface-ground);
}
</style>
