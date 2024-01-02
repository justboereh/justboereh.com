<script setup lang="ts">
const c = 'cursor-pointer hover:underline underline-offset-4 text-right'
</script>

<template>
  <div class="p-4 z-1000 pointer-events-none select-none sticky">
    <div class="mx-auto max-w-5xl flex sm:items-center justify-between">
      <nuxt-link
        to="#"
        class="bg-white px-2 py-1 rounded-md h-fit pointer-events-auto shadow-xl shadow-black/25"
      >
        <svg-logo class="h-6 sm:h-8" />
      </nuxt-link>

      <span class="flex <sm:flex-col <sm:gap-2 pointer-events-auto gap-16">
        <nuxt-link
          to="#about"
          :class="c"
        >
          About
        </nuxt-link>

        <nuxt-link
          to="#projects"
          :class="c"
        >
          Projects
        </nuxt-link>

        <nuxt-link
          to="#contact"
          :class="c"
        >
          Contact
        </nuxt-link>

        <nuxt-link
          to="#cv"
          :class="c"
        >
          CV
        </nuxt-link>
      </span>
    </div>
  </div>
</template>
