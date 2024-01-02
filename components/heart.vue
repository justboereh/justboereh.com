<script setup lang="ts">
import { useWindowSize } from '@vueuse/core'

type Props = {
  fill?: boolean
  color?: string
}

const props = defineProps<Props>()
const rand = [Random(25, 75) / 100, Random(25, 75) / 100]
const { width, height } = useWindowSize()

function Clamp(v: number, min: number, max: number) {
  return Math.min(Math.max(v, min), max)
}

function Random(min: number, max: number) {
  return Clamp(Math.random(), min, max)
}
</script>

<template>
  <div
    :class="['transform transition-all duration-200 absolute -translate-x-1/2 -translate-y-1/2 z-10', fill ? 'scale-10000' : 'scale-0 pointers-events-none']"
    :style="`top: ${height * rand[1]}px; left: ${width * rand[0]}px; width: 35px; height: 36px;`"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-13.8746 -4.18904 23.57 31.01"
    >
      <path
        d="m 0 0 l -3.68 4.64 l -2.54 -4.09 c -2.71 -4.28 -7.47 -5.55 -7.65 -2.11 c -0.22 4.3 7.44 19.86 11.53 24.2 l 4.28 4.18 l 3.08 -6.39 c 4.43 -9.26 5.95 -18.84 3.53 -22.07 c -2.77 -3.76 -4.15 -3.48 -8.55 1.64 z"
        :fill="color || '#fff'"
      />
    </svg>
  </div>
</template>
