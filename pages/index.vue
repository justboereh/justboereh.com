<script setup lang="ts">
import { useMouse, useWindowSize } from '@vueuse/core'

type Heart = {
  x: number
  y: number
  fill: boolean
  z: number
  color?: string
}

const hearts = ref<Heart[]>([])

useHead({
  title: 'justboereh',
  htmlAttrs: {
    class: 'bg-black text-white overflow-hidden',
  },
})
</script>

<template>
  <navigations />
  <rollers />

  <heart />
</template>
