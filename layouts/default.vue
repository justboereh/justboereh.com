<script setup lang="ts">
useHead({
  title: 'justboereh',
  htmlAttrs: {
    class: 'overflow-hidden transition-colors duration-500',
  },
})
</script>

<template>
  <navigations />

  <slot />
</template>
