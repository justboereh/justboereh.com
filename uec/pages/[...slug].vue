<script setup lang="ts">
useHead({
    title: '404 Not Found - UEC',
})
</script>

<template>
    <main
        class="grid place-items-center p-8"
        style="height: calc(100vh - 6rem - 1px)"
    >
        <div class="text-center">
            <h1>404 Not Found</h1>

            <p>Whoops! We can't find the page you're looking for.</p>

            <br />

            <div class="flex gap-4 justify-center">
                <u-button
                    icon="fluent:chevron-left-24-regular"
                    @click="$router.back()"
                >
                    Go back
                </u-button>

                <u-button icon="fluent:home-24-regular" type="text" href="/">
                    Home
                </u-button>
            </div>
        </div>
    </main>
</template>
