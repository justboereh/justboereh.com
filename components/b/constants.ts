export const sizes = {
    tiny: 2,
    smaller: 4,
    small: 6,
    default: 8,
    large: 10,
    larger: 12,
    largest: 16,
    massive: 20,
}

export type Props = {
    type?: 'default' | 'text' | 'fill'
    shape?: 'default' | 'square' | 'circle'
    // prettier-ignore
    size?: 'default' | 'tiny' | 'small' | 'smaller' | 'medium' | 'large' | 'larger' | 'massive'
    icon?: string
    href?: string
    target?: string
    danger?: boolean
}
