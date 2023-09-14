<script setup lang="ts">
definePageMeta({
    layout: 'empty',
})
</script>

<template>
    <div class="w-screen h-screen flex flex-col">
        <nav class="w-full p-2 relative flex justify-between select-none">
            <b-button
                type="text"
                icon="fluent:chevron-left-24-regular"
                href="/"
            >
                Back
            </b-button>

            <client-only>
                <span
                    class="absolute transform -translate-x-1/2 left-1/2 -translate-y-1/2 top-1/2"
                >
                    Games
                </span>
            </client-only>
        </nav>

        <main class="flex-grow p-4 grid place-items-center">
            <div class="flex justify-center gap-4 flex-wrap max-w-xl mx-auto">
                <nuxt-link to="/games/memory-match">
                    <b-button> Memory Match </b-button>
                </nuxt-link>

                <nuxt-link to="/games/tile-match">
                    <b-button> Tile Match </b-button>
                </nuxt-link>
            </div>
        </main>
    </div>
</template>
