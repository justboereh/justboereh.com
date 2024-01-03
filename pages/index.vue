<script setup lang="ts">
import { useMouse, useWindowSize } from '@vueuse/core'

useHead({
  title: 'justboereh',
  htmlAttrs: {
    class: 'bg-black text-white overflow-hidden',
  },
})
</script>

<template>
  <client-only>
    <circles />

    <navigations />
    <rollers />
  </client-only>
</template>
