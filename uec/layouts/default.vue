<script setup lang="ts">
import { useLocalStorage, useWindowSize } from '@vueuse/core'

const links = [
    {
        to: '/movies',
        text: 'Movies & More',
    },
    {
        to: '/sales/loyalty-rewards',
        text: 'Loyalty Rewards',
    },
    {
        to: '/sales/gift-cards',
        text: 'Gift Cards',
    },
    {
        to: '/sales/group',
        text: 'Group Sales',
    },
    {
        to: '/about',
        text: 'About UEC',
    },
]
const theatre = useLocalStorage('uec-theatre', '')
const breadcrumbs = useState<string[]>('useBreadcrumbs', () => [])
const drawerEnabled = ref(false)
const { height } = useWindowSize()
</script>

<template>
    <nav
        class="bg-dark-900 border-b border-brand-red relative overflow-x-hidden sticky top-0 pl-4 sm:px-8 z-100"
    >
        <div class="max-w-5xl mx-auto h-24 flex gap-4 justify-between">
            <nuxt-link
                class="h-full py-2"
                to="/"
                @click="drawerEnabled = false"
            >
                <img class="h-full" src="/img/logo.png" alt="logo" />
            </nuxt-link>

            <div class="md:hidden flex flex-col min-w-42">
                <div
                    class="h-10 flex justify-between items-center flex-grow md:hidden w-full"
                >
                    <nuxt-link
                        class="grid place-items-center text-2xl h-full aspect-1"
                        to="/account"
                        @click="drawerEnabled = false"
                    >
                        <icon name="fluent:person-20-filled" />
                    </nuxt-link>

                    <button
                        class="grid place-items-center text-2xl h-full aspect-1"
                        to="/search"
                        @click="drawerEnabled = false"
                    >
                        <icon name="fluent:search-20-filled" />
                    </button>

                    <button
                        class="text-2xl h-full aspect-1 transition duration-300"
                        :class="[drawerEnabled ? 'bg-brand-red' : '']"
                        @click="drawerEnabled = !drawerEnabled"
                    >
                        <icon
                            :name="
                                drawerEnabled
                                    ? 'fluent:dismiss-20-filled'
                                    : 'fluent:line-horizontal-3-20-filled'
                            "
                        />
                    </button>
                </div>

                <div
                    class="bg-brand-red relative after:content-[''] after:block after:bg-brand-red after:w-full after:h-10 after:absolute after:left-full after:bottom-0"
                >
                    <span
                        class="px-2 justify-end items-center flex-grow flex gap-2 h-10 whitespace-nowrap"
                    >
                        <icon
                            name="fluent:location-24-filled"
                            class="text-white"
                        />

                        <client-only>
                            <nuxt-link
                                to="/select-theatre"
                                class="hover:underline"
                                @click="drawerEnabled = false"
                            >
                                {{ theatre || 'NO THEATRE SET' }}
                            </nuxt-link>
                        </client-only>
                    </span>
                </div>
            </div>

            <div class="flex flex-col h-full <md:hidden">
                <div class="h-10 flex items-center gap-4 flex-grow <md:hidden">
                    <span
                        class="px-2 justify-end items-center flex-grow flex gap-2"
                    >
                        <icon
                            name="fluent:location-24-filled"
                            class="text-brand-red"
                        />

                        <client-only>
                            <nuxt-link
                                to="/select-theatre"
                                class="hover:underline"
                            >
                                {{ theatre || 'NO THEATRE SET' }}
                            </nuxt-link>
                        </client-only>
                    </span>

                    <u-input />
                </div>

                <div
                    class="bg-brand-red relative after:content-[''] after:block after:bg-brand-red after:w-full after:h-10 after:absolute after:left-full after:bottom-0"
                >
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

    <div
        class="md:hidden fixed top-0 bottom-0 left-0 right-0 pt-24 pointer-events-none z-100"
    >
        <div
            class="h-full max-h-full flex flex-col transition duration-200"
            :class="[drawerEnabled ? 'bg-dark-900/50 pointer-events-auto' : '']"
            :style="{
                transitionDelay: drawerEnabled
                    ? '0ms'
                    : `${links.length * 25}ms`,
            }"
            @click="drawerEnabled = false"
        >
            <nuxt-link
                v-for="(link, index) of links"
                :key="link.to"
                :class="[
                    'px-4 h-12 bg-brand-red flex items-center capitalize border-b border-red-500 transition duration-300 transform',
                    drawerEnabled ? '' : 'translate-x-full',
                ]"
                :style="{
                    transitionDelay: drawerEnabled
                        ? `${index * 50}ms`
                        : `${(links.length - 1) * 25 - index * 25}ms`,
                }"
                :to="link.to"
                @click="drawerEnabled = false"
            >
                {{ link.text }}
            </nuxt-link>
        </div>
    </div>
</template>
