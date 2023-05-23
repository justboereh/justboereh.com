<script setup lang="ts">
type Service = {
    color: string
    org: string
    name: string
    cost: string
}

const ranking = useState<Service[]>('useFreeDevRanking')
</script>

<template>
    <div class="px-4">
        <div
            class="grid sm:grid-cols-2 lg:grid-cols-3 mx-auto max-w-5xl border border-4 border-light-900 rounded-lg shadow shadow-light-900"
        >
            <div v-for="item of ranking" class="flex items-center gap-2 p-2">
                <span
                    class="h-full w-1.5 rounded-full"
                    :style="`background-color: ${item.color}`"
                />

                <div class="flex flex-col">
                    <p>{{ item.name }}</p>

                    <b class="text-dark-50 text-sm"> {{ item.org }}</b>
                </div>

                <span class="flex-grow" />

                <span class="flex">
                    ${{ item.cost }}

                    <span class="px-1 text-white/50 text-sm"> /month </span>
                </span>
            </div>
        </div>
    </div>
</template>
