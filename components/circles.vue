<script setup lang="ts">
// @ts-ignore-next-line
import { Gradient } from 'smooth-gradient'

const gradient = new Gradient('#ff931e', '#ff1d25')
const levels = ['', 'about', 'projects', 'contact', 'cv']

const amount = 5
const route = useRoute()
const level = computed(() => levels.indexOf(route.hash.slice(1)))
</script>

<template>
  <div class="absolute top-0 z-1">
    <circles-circle
      v-for="index of amount"
      :key="index"
      :value="level > index - 1 ? 1 : 0"
      :delay="level === index - 1 ? (index - 1) * 50 : 0"
      :style="{ zIndex: amount * 2 + 50 }"
      :color="gradient.getColorFromValue((index - 1) * levels.length)"
    />
  </div>
</template>
