<script setup lang="ts">
import { useTransition, TransitionPresets } from '@vueuse/core'

const opacity = ref(0)
const transitioned = useTransition(opacity, {
  duration: 500,
  transition: TransitionPresets.linear,
})

onMounted(() => setTimeout(() => (opacity.value = 1), 200))

useHead({
  title: 'justboereh',
})
</script>

<template>
  <client-only>
    <div :style="{ opacity: transitioned }">
      <circles />

      <rollers />
    </div>
  </client-only>
</template>
