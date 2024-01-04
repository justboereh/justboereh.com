<script setup lang="ts">
import { useTransition, TransitionPresets } from '@vueuse/core'

const opacity = ref(0)
const transitioned = useTransition(opacity, {
  duration: 500,
  transition: TransitionPresets.linear,
})

onMounted(() => setTimeout(() => (opacity.value = 1), 200))

useHead({
  title: 'about boe',
  htmlAttrs: {
    class: 'bg-[#ff931e] text-white',
  },
})
</script>

<template>
  <div
    class="fixed top-0 left-0 right-0 bottom-0 p-4"
    :style="{ opacity: transitioned }"
  >
    <div class="w-full h-full max-w-4xl mx-auto flex flex-col justify-center items-center indent-8 text-lg">
      <p>
        I was born at a very young age near the border of Myanmar and Thailand. I lived in a refugee camp for 7 years before moving to the United States. I am
        currently a student at Southern New Hampshire University, majoring in Computer Science. I am also a self-taught web developer and software engineer. My
        hobbies include playing video games, watching movies, and listening to music (used to produce music).
      </p>

      <br />

      <p>What</p>
    </div>
  </div>
</template>
