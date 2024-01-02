<script setup lang="ts">
import { TransitionPresets, useTransition, useWindowSize, watchDebounced, watchIgnorable } from '@vueuse/core'
import { compile, morph } from 'svg-path-morph'

type Props = {
  value: number
  color?: string
}

const rand = [Random(25, 75) / 100, Random(25, 75) / 100]

const props = defineProps<Props>()
const { width, height } = useWindowSize()
const value = ref(0)
const transitioned = useTransition(value, {
  duration: 200,
  transition: TransitionPresets.easeInOutCubic,
})
const paths = computed(() => {
  const pos = `${width.value * rand[0]} ${height.value * rand[1]}`

  return compile([
    `m ${pos} c 0 0.01 -0.02 0.02 -0.02 0 c 0 0 0 0 0 0 c 0 -0.02 0.02 -0.01 0.02 0 c 0 0 0 0 0 0 z`,
    `m ${width.value} ${height.value} c 0 0 0 0 -${width.value} 0 c 0 0 0 0 0 -${height.value} c 0 0 0 0 ${width.value} 0 c 0 0 0 0 0 ${height.value} z`,
  ])
})
const transitionedSVG = computed(() => {
  const t = transitioned.value ** 3
  const c = (v: number) => Clamp(v, 0, 1)
  const weights = [c(0.5 - t), c(0.5 + Math.abs(0.5 - t)), c(t - 0.5)]

  return morph(paths.value, [1 - t, t])
})

function Clamp(v: number, min: number, max: number) {
  return Math.min(Math.max(v, min), max)
}

function Random(min: number, max: number) {
  return Clamp(Math.random(), min, max)
}

watchDebounced(props, (v) => (value.value = v.value), { debounce: 200 })
</script>

<template>
  <div class="fixed top-0 left-0 right-0 bottom-0">
    <svg
      class="w-full h-full"
      :view-box="`0 0 ${width} ${height}`"
    >
      <path
        :fill="color || '#fff'"
        :d="transitionedSVG"
      />
    </svg>
  </div>
</template>
