<script setup lang="ts">
import { useBreakpoints, breakpointsTailwind } from '@vueuse/core'
import { Swiper, SwiperSlide } from 'swiper/vue'

import 'swiper/css'

type Movies = {
    id: number
    title: string
    poster: string
    special: boolean
    released: Date
}

type Section = { title: string; movies: Movies[] }

const breakpoints = useBreakpoints(breakpointsTailwind)
const isDeviceSmall = breakpoints.smallerOrEqual('sm')
const isDeviceMedium = breakpoints.between('sm', 'md')
const isDeviceLarge = breakpoints.between('md', 'lg')

const slideAmount = computed(() => {
    if (isDeviceSmall.value) return 2.25
    if (isDeviceMedium.value) return 2.5
    if (isDeviceLarge.value) return 5

    return 7.5
})

const { data: sections } = useFetch<Section[]>('/api/movies', {
    method: 'POST',
    transform: (movies: Movies[]) => {
        const result: Section[] = [
            { title: 'Now Playing', movies: [] },
            { title: 'Coming Soon', movies: [] },
            { title: 'Special Events', movies: [] },
        ]

        for (const movie of movies) {
            if (new Date(movie.released).valueOf() <= Date.now()) {
                result[0].movies.push(movie)
            } else {
                result[1].movies.push(movie)
            }

            if (movie.special) result[2].movies.push(movie)
        }

        return result.map((x) => ({
            ...x,
            movies: x.movies.sort((a, b) => a.title.localeCompare(b.title)),
        }))
    },
})
</script>

<template>
    <div
        v-for="section of sections"
        :key="section.title"
        class="px-4 sm:px-8 select-none"
    >
        <div class="py-4">
            <h1 class="max-w-5xl mx-auto">{{ section.title }}</h1>
        </div>

        <swiper :slides-per-view="slideAmount" :space-between="16">
            <swiper-slide v-for="movie of section.movies">
                <nuxt-link class="space-y-2 group" :to="`/movies/${movie.id}`">
                    <img
                        class="w-full"
                        :src="movie.poster"
                        :alt="movie.title"
                    />

                    <p class="group-hover:underline text-white/50">
                        {{ movie.title }}
                    </p>
                </nuxt-link>
            </swiper-slide>
        </swiper>
    </div>
</template>
