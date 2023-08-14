<script setup lang="ts">
import { NuxtLink } from '#components'

type Props = {
    type?: 'default' | 'text' | 'fill'
    shape?: 'default' | 'square' | 'circle'
    // prettier-ignore
    size?: 'default' | 'tiny' | 'small' | 'smaller' | 'medium' | 'large' | 'larger' | 'massive'
    icon?: string
    href?: string
    target?: string
    danger?: boolean
}

const sizes: Record<string, { h: string; w: string }> = {
    tiny: { h: 'h-2', w: 'w-2' },
    smaller: { h: 'h-4', w: 'w-4' },
    small: { h: 'h-6', w: 'w-6' },
    default: { h: 'h-8', w: 'w-8' },
    large: { h: 'h-10', w: 'w-10' },
    larger: { h: 'h-12', w: 'w-12' },
    largest: { h: 'h-16', w: 'w-16' },
    massive: { h: 'h-20', w: 'w-20' },
}

const props = defineProps<Props>()

const sizeClass = computed(() => {
    const size = props.size || 'default'
    const ratioed = ['square', 'circle'].includes(props.shape || '')
    let result = []

    if (sizes[size]) result.push(sizes[size].h)
    if (!ratioed) result.push('px-4')
    if (ratioed && sizes[size]) {
        result.push(sizes[size].w)
        result.push('justify-center')
    }

    return result.join(' ')
})
</script>

<template>
    <component
        :is="!href ? 'button' : NuxtLink"
        :class="[
            'button',
            `type-${type || 'default'}`,
            `shape-${shape || 'default'}`,
            danger && 'danger',
            sizeClass,
        ]"
        :to="href"
        :target="target"
    >
        <icon v-if="icon" :name="icon" />

        <slot />
    </component>
</template>

<style scoped>
.button {
    @apply rounded-md transition duration-200 flex items-center gap-1 select-none;
}

.button.type-default:not(.danger) {
    @apply bg-white border-2 border-black;
}

.button.type-default:not(.danger):hover:not(:active) {
    box-shadow: 2px 2px 0px 0px black;
}

.button.type-fill:not(.danger) {
    @apply bg-black border-2 border-black text-white;
}

.button.type-fill:not(.danger):hover:not(:active) {
    box-shadow: 2px 2px 0px 0px white, 4px 4px 0px 0px black;
}

.button.type-text:not(.danger):hover:not(:active) {
    @apply bg-light-700;
}

.button.type-text.danger {
    @apply text-red-700;
}

.button.type-text.danger:hover:not(:active) {
    @apply bg-red-100;
}

.button:not(.danger):active {
    @apply bg-light-800;
}
.button.danger:active {
    @apply bg-red-200;
}
</style>
