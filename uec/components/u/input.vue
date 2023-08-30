<script setup lang="ts">
type Props = {
    value?: any
    block?: boolean
    placeholder?: string
    type?: string
}

const props = defineProps<Props>()
const emit = defineEmits(['update:value'])

function Updated(target: EventTarget | null) {
    if (!target) return

    emit('update:value', (target as HTMLInputElement).value.trim())
}
</script>

<template>
    <div :class="['h-8', block ? '' : 'w-sm']">
        <input
            class="text-whtie placeholder:text-white/50 outline-none h-8 px-4 border border-dark-50 bg-dark-500 w-full"
            :type="type || 'text'"
            :placeholder="placeholder"
            @input="Updated($event.target)"
        />
    </div>
</template>
