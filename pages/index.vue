<script setup lang="ts">
import { useWindowSize, watchIgnorable } from '@vueuse/core'
import { compile, morph } from 'svg-path-morph'
// @ts-ignore-next-line
import { Gradient } from 'smooth-gradient'
import { Roller } from 'vue-roller'
import 'vue-roller/dist/style.css'

const gradient = new Gradient('#ff931e', '#ff1d25')
const paths = [
  'M25.4,-1.2C25.4,10.3,12.7,20.7,-0.8,20.7C-14.2,20.7,-28.4,10.3,-28.4,-1.2C-28.4,-12.7,-14.2,-25.4,-0.8,-25.4C12.7,-25.4,25.4,-12.7,25.4,-1.2Z',
  'm 50,-50 c 0,11.5 13.5,100 0,100 -13.4,0 -100,11.5 -100,0 0,-11.5 -13.4,-100 0,-100 13.5,0 100,-11.5 100,0 z',
]
const values = [
  {
    first: 'Frontend',
    second: 'Developer',
  },
  {
    first: 'Backend',
    second: 'Developer',
  },
  {
    first: 'Software',
    second: 'Developer',
  },
  {
    first: 'Software',
    second: 'Engineer',
  },
  {
    first: 'Your',
    second: 'Engineer',
  },
  {
    first: 'Your',
    second: 'Developer',
  },
]
const { width, height } = useWindowSize()
const level = ref(0)
const canChangeLevel = ref(true)
const RollerValues = reactive({
  first: 'frontend',
  second: 'developer',
  index: 0,
})

function UpdateTextGradient() {
  const el = document.querySelectorAll<HTMLDivElement>('.roller:nth-child(1) .roller-item')

  el.forEach((item, index) => (item.style.color = gradient.getColorFromValue((index / el.length) * 100)))
}

function ChangeLevel(level: 1 | 2 | 3) {}

onMounted(() => {
  UpdateTextGradient()

  setInterval(() => {
    if (RollerValues.index === values.length - 1) RollerValues.index = 0
    else RollerValues.index++

    RollerValues.first = values[RollerValues.index].first
    RollerValues.second = values[RollerValues.index].second

    setTimeout(UpdateTextGradient, 100)
  }, 2000)
})

useHead({
  title: 'justboereh',
  htmlAttrs: {
    class: 'bg-black text-white',
  },
})
</script>

<template>
  <div class="p-4 z-10 pointer-events-none select-none">
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

  <div class="fixed top-0 left-0 right-0 bottom-0 flex flex-col gap-4 justify-center items-center pointer-events-none">
    <h1 class="text-md sm:text-2xl md:text-4xl">Boe Reh</h1>

    <div class="flex text-2xl sm:text-5xl md:text-7xl gap-2">
      <Roller
        char-set="alphabet"
        :value="RollerValues.first"
      />

      <Roller
        char-set="alphabet"
        :value="RollerValues.second"
      />
    </div>
  </div>

  <svg
    class="fixed top-0 left-0 right-0 bottom-0"
    :view-box="`0 0 ${width} ${height}`"
  >
    <path
      fill="#fff"
      :d="`m 0 0 c 0 5 8 5 8 0 C 8 -5 0 -5 0 0`"
    />
  </svg>
</template>
