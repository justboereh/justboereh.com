<template>
    <div class="hero">
        <span>
            <span class="text-5xl">
                Hello, I'm Boe Reh.
                <br />
                A full-stack developer.
            </span>

            <br />

            <p class="text-2xl text-black/70">
                I mainly develop in Nuxt/Vue, but I dive into Next, Astro,
                Svelte.
            </p>

            <br />

            <div class="flex gap-2">
                <nuxt-link to="/contact">
                    <b-button type="fill">Contact Me</b-button>
                </nuxt-link>

                <nuxt-link to="/projects">
                    <b-button type="text">See my works</b-button>
                </nuxt-link>
            </div>
        </span>
    </div>
</template>

<style scoped>
.hero {
    height: calc(100vh - 5rem);
    @apply grid place-items-center;
}
</style>
