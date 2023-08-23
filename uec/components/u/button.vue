<script setup lang="ts">
import { NuxtLink } from '#components'

type ButtonTypes = 'default' | 'primary' | 'text' | 'dashed'
type ButtonSizes = 'small' | 'default' | 'large'

type Props = {
    icon?: string
    type?: ButtonTypes
    size?: ButtonSizes
    href?: string
    target?: string
    block?: boolean
}

const types: Record<ButtonTypes, string> = {
    default:
        'border border-dark-50 hover:border-brand-red hover:text-brand-red active:border-red-900 active:text-red-900',
    dashed: 'border-dashed border-dark-50 hover:border-brand-red hover:text-brand-red active:border-red-900 active:text-red-900',
    primary: '',
    text: 'hover:bg-dark-500 active:bg-red-900 active:text-light-200',
}
const sizes: Record<ButtonSizes, string> = {
    small: 'px-2 h-6 text-sm',
    default: 'px-4 h-10',
    large: 'px-6 h-14 text-md',
}

const props = defineProps<Props>()
</script>

<template>
    <component
        :is="href ? NuxtLink : 'button'"
        :class="[
            'flex items-center gap-2 rounded-md transition duration-300 select-none',
            type ? types[type] : types.default,
            size ? sizes[size] : sizes.default,
        ]"
        :to="href"
        :target="href && target"
    >
        <icon v-if="icon" :name="icon" />
        <slot />
    </component>
</template>
