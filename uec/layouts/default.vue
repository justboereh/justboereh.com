<script setup lang="ts">
import { useLocalStorage } from '@vueuse/core'

const links = [
    {
        to: '/movies',
        text: 'MOVIES & MORE',
    },
    {
        to: '/theatres',
        text: 'THEATRES',
    },
    {
        to: '/sales/loyalty-rewards',
        text: 'LOYALTY REWARDS',
    },
    {
        to: '/sales/gift-cards',
        text: 'GIFT CARDS',
    },
    {
        to: '/sales/group',
        text: 'GROUP SALES',
    },
    {
        to: '/about',
        text: 'ABOUT UEC',
    },
]
const theatre = useLocalStorage('uec-theatre', '')
const breadcrumbs = useState<string[]>('useBreadcrumbs', () => [])
const theatreEnabled = ref(false)
</script>

<template>
    <nav
        class="bg-dark-900 border-b border-red relative overflow-x-hidden sticky top-0"
    >
        <div class="max-w-5xl mx-auto h-24 flex gap-4 justify-between">
            <nuxt-link class="h-full <sm:px-2 py-2" to="/">
                <img class="h-full" src="/img/logo.png" alt="logo" />
            </nuxt-link>

            <div class="flex flex-col h-full">
                <div class="h-10 flex items-center gap-4 flex-grow <md:hidden">
                    <span
                        class="px-2 justify-end items-center flex-grow flex gap-2"
                    >
                        <icon
                            name="fluent:location-24-filled"
                            class="text-red"
                        />

                        <nuxt-link to="/select-theatre" class="hover:underline">
                            {{ theatre || 'NO THEATRE SET' }}
                        </nuxt-link>
                    </span>

                    <input />
                </div>

                <div
                    class="h-10 flex justify-end px-4 gap-4 items-center flex-grow md:hidden"
                >
                    <button class="text-2xl">
                        <icon name="fluent:person-20-filled" />
                    </button>

                    <button class="text-2xl">
                        <icon name="fluent:search-20-filled" />
                    </button>

                    <button class="text-2xl">
                        <icon name="fluent:line-horizontal-3-20-filled" />
                    </button>
                </div>

                <div
                    class="bg-red relative after:content-[''] after:block after:bg-red after:w-full after:h-10 after:absolute after:left-full after:bottom-0"
                >
                    <span
                        class="md:hidden px-2 justify-end items-center flex-grow flex gap-2 h-10"
                    >
                        <icon
                            name="fluent:location-24-filled"
                            class="text-white"
                        />

                        <nuxt-link to="/select-theatre" class="hover:underline">
                            {{ theatre || 'NO THEATRE SET' }}
                        </nuxt-link>
                    </span>

                    <div class="<md:hidden h-10 flex whitespace-nowrap text-sm">
                        <nuxt-link
                            v-for="(link, index) of links"
                            :key="link.to"
                            class="hover:bg-black/20 px-2 lg:px-4 grid place-items-center"
                            :class="[
                                index < links.length - 1
                                    ? 'border-solid border-r border-white/20 hover:border-white/0'
                                    : '',
                            ]"
                            :to="link.to"
                        >
                            {{ link.text }}
                        </nuxt-link>
                    </div>
                </div>
            </div>
        </div>
    </nav>

    <slot />
</template>
