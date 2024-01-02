<script setup lang="ts">
import { Roller } from 'vue-roller'
// @ts-ignore-next-line
import { Gradient } from 'smooth-gradient'
import 'vue-roller/dist/style.css'

const gradient = new Gradient('#ff931e', '#ff1d25')
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
const RollerValues = reactive({
  first: values[0].first,
  second: values[0].second,
  index: 0,
})

function UpdateTextGradient() {
  const el = document.querySelectorAll<HTMLDivElement>('.roller:nth-child(1) .roller-item')

  el.forEach((item, index) => (item.style.color = gradient.getColorFromValue((index / el.length) * 100)))
}

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
</script>

<template>
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
</template>
