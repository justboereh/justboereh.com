<template>
  <div class="p-4 z-100 pointer-events-none select-none">
    <div class="mx-auto max-w-5xl flex justify-between">
      <svg-logo class="h-6 sm:h-8" />

      <span class="flex <sm:flex-col <sm:gap-2 pointer-events-auto gap-16">
        <button
          class="cursor-pointer hover:underline underline-offset-4 text-right"
          type="button"
        >
          About
        </button>

        <button
          class="cursor-pointer hover:underline underline-offset-4 text-right"
          type="button"
        >
          Projects
        </button>

        <button
          class="cursor-pointer hover:underline underline-offset-4 text-right"
          type="button"
        >
          Contact
        </button>

        <button
          class="cursor-pointer hover:underline underline-offset-4 text-right"
          type="button"
        >
          CV
        </button>
      </span>
    </div>
  </div>
</template>
