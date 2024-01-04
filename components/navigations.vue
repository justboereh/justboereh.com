<script setup lang="ts">
import { useTransition, TransitionPresets } from '@vueuse/core'

const c = 'cursor-pointer hover:underline underline-offset-4 text-right'
const opacity = ref(0)
const route = useRoute()
const transitioned = useTransition(opacity, {
  duration: 500,
  transition: TransitionPresets.linear,
})

onMounted(() => (opacity.value = 1))
</script>

<template>
  <div
    :class="['p-4 z-1000 pointer-events-none select-none sticky']"
    :style="{
      opacity: transitioned,
    }"
  >
    <div class="mx-auto max-w-5xl flex sm:items-center justify-between">
      <nuxt-link
        to="/"
        :class="[
          'border-solid border-1 px-2 py-1 rounded-md h-fit shadow-lg',
          route.path === '/' ? 'border-transparent shadow-black/0' : 'bg-white border-light-300 shadow-black/15',
          transitioned === 1 ? 'pointer-events-auto' : 'pointer-events-none',
        ]"
      >
        <svg-logo class="h-6 sm:h-8" />
      </nuxt-link>

      <span :class="['flex <sm:flex-col <sm:gap-2 pointer-events-auto gap-16', transitioned === 1 ? '' : 'pointer-events-none']">
        <nuxt-link
          to="/about"
          :class="c"
        >
          About
        </nuxt-link>

        <nuxt-link
          to="/projects"
          :class="c"
        >
          Projects
        </nuxt-link>

        <nuxt-link
          to="/contact"
          :class="c"
        >
          Contact
        </nuxt-link>

        <nuxt-link
          to="/cv"
          :class="c"
        >
          CV
        </nuxt-link>
      </span>
    </div>
  </div>
</template>
