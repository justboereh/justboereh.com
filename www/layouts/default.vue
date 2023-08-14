<script setup>
import '@unocss/reset/tailwind.css'

const drawerEnabled = ref(false)

useHead({})
</script>

<template>
    <div class="flex flex-col">
        <nav class="<sm:hidden w-full p-2 flex justify-center select-none">
            <nuxt-link to="/">
                <b-button type="text"> Home </b-button>
            </nuxt-link>

            <nuxt-link to="/about">
                <b-button type="text"> About </b-button>
            </nuxt-link>

            <nuxt-link to="/games">
                <b-button type="text"> Games </b-button>
            </nuxt-link>

            <nuxt-link to="/projects">
                <b-button type="text"> Projects </b-button>
            </nuxt-link>

            <nuxt-link to="/contact">
                <b-button type="text"> Contact </b-button>
            </nuxt-link>
        </nav>

        <nav class="sm:hidden w-full p-2 flex justify-end select-none">
            <b-button
                @click="drawerEnabled = !drawerEnabled"
                type="text"
                shape="square"
                icon="fluent:line-horizontal-3-20-regular"
            />
        </nav>

        <main class="p-4">
            <slot />
        </main>

        <div
            class="fixed top-0 left-0 right-0 bottom-0 z-1000 pointer-events-none overflow-hidden"
        >
            <div class="absolute grid grid-rows-7 w-full h-full">
                <span
                    v-for="index of 7"
                    :key="index"
                    class="block transform w-full bg-white transition"
                    :class="[
                        drawerEnabled ? 'translate-x-0' : 'translate-x-full',
                    ]"
                    :style="`transition-delay: ${index * 100}ms`"
                />
            </div>
        </div>
    </div>
</template>
