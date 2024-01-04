<script setup lang="ts">
import { TransitionPresets, useMounted, useTransition, useWindowSize, watchDebounced, watchIgnorable, watchOnce } from '@vueuse/core'
import type { StyleValue } from 'nuxt/dist/app/compat/capi'

type Props = {
  value: number
  delay?: number
  color?: string
  x?: number
  y?: number
}

const rand = [Math.random() / 2 + 0.25, Math.random() / 2 + 0.25] as const

const props = defineProps<Props>()
const isMounted = useMounted()
const { width, height } = useWindowSize()
const value = ref(0)
const opacity = ref(0)
const valueTransitioned = useTransition(value, {
  duration: 400,
  transition: TransitionPresets.linear,
  delay: props.delay || 0,
})
const opacityTransitioned = useTransition(value, {
  duration: 400,
  transition: TransitionPresets.linear,
  delay: props.delay || 0,
})
const style = computed<StyleValue>(() => {
  const h = height.value
  const w = width.value
  const t = valueTransitioned.value

  const x = (n1: number, n2: number) => n1 - (n1 - n2) * t ** 5
  const z = (t + t ** 7) / 2

  return {
    backgroundColor: props.color || '#fff',
    top: `${x(h * (props.x || rand[1]), h / 2)}px`,
    left: `${x(w * (props.x || rand[0]), w / 2)}px`,
    width: w * z + 'px',
    aspectRatio: `${w} / ${w - (w - h) * t ** 5}`,
    borderRadius: 999 - 999 * t ** 3 + 'px',
    opacity: opacityTransitioned.value || opacity.value,
  }
})

watchOnce(isMounted, () => setTimeout(() => (opacity.value = 1), 100))
watchDebounced(props, (v) => (value.value = v.value))
</script>

<template>
  <div
    class="absolute transform -translate-x-1/2 -translate-y-1/2 shadow-lg shadow-black/50 max-w-screen max-h-screen"
    :style="style"
    :v="value"
  />
</template>
