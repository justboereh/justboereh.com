<script setup lang="ts">
import dayjs from 'dayjs'
import { useBreakpoints, breakpointsTailwind } from '@vueuse/core'

const breakpoint = useBreakpoints(breakpointsTailwind)
const isBigScreen = breakpoint.greaterOrEqual('sm')

type Game = {
    playing: boolean
    selectable: boolean
    tiles: (string | null)[][]
    time: number | null
    interval: number | null
    cleared: {
        row: number
        column: number
    }[]
    selected: {
        first: {
            row: number | null
            column: number | null
        }
        second: {
            row: number | null
            column: number | null
        }
    }
    settings: {
        tiles: number
    }
}
// prettier-ignore
const emojis = ['😀','🤬','🤣','🤡','😈','👽','🥶','💩','👾','🥸','🤮','🐷','🐞','🦋','🐦','🐀','🦄','🐳']
const game = reactive<Game>({
    playing: false,
    selectable: false,
    time: 0,
    interval: null,
    tiles: [],
    cleared: [],
    selected: {
        first: {
            row: null,
            column: null,
        },
        second: {
            row: null,
            column: null,
        },
    },
    settings: {
        tiles: 36,
    },
})

const isTileSelected = computed(() => {
    return (row: number, col: number) => {
        const fr = game.selected.first.row === row
        const fc = game.selected.first.column === col
        const sr = game.selected.second.row === row
        const sc = game.selected.second.column === col

        return (fr && fc) || (sr && sc)
    }
})
const isTileCleared = computed(() => {
    return (row: number, col: number) => {
        return game.cleared.find((x) => row === x.row && col === x.column)
    }
})

function FillTiles() {
    let useEmojis: string[] = [...emojis]

    for (const _ of [...Array(18 - game.settings.tiles / 2)]) {
        useEmojis.splice(Math.floor(Math.random() * useEmojis.length), 1)
        console.log(useEmojis)
    }
    useEmojis = [...useEmojis, ...useEmojis]

    for (let row = 0; row < Math.sqrt(game.settings.tiles); row++) {
        for (let col = 0; col < Math.sqrt(game.settings.tiles); col++) {
            const index = Math.floor(Math.random() * useEmojis.length)

            game.tiles[row][col] = useEmojis[index]
            useEmojis.splice(index, 1)
        }
    }

    game.selectable = true
}

function UnselectTiles() {
    game.selected.first.column = null
    game.selected.first.row = null
    game.selected.second.column = null
    game.selected.second.row = null

    game.selectable = true
}

function HardnessChecked() {
    const isHard = game.settings.tiles === 36

    game.settings.tiles = isHard ? 16 : 36
    game.settings.tiles = isHard ? 16 : 36
}

function StartGame() {
    if (game.interval) clearInterval(game.interval)
    game.time = 0
    game.cleared = []
    UnselectTiles()
    game.selectable = false
    game.playing = true
    game.tiles = [...Array(Math.sqrt(game.settings.tiles))].map(() => [])

    setTimeout(FillTiles, 1)

    game.interval = setInterval(() => {
        if (game.time === null) return

        game.time += 100
    }, 100) as unknown as number
}

function EndGame() {
    game.selectable = false
    game.playing = false
}

function TileClicked(row: number, col: number) {
    if (!!isTileCleared.value(row, col)) return
    if (!game.selectable) return
    game.selectable = false

    if (game.selected.first.row === null) {
        game.selected.first.row = row
        game.selected.first.column = col

        return (game.selectable = true)
    }

    if (game.selected.first.row === row && game.selected.first.column === col) {
        return (game.selectable = true)
    }

    game.selected.second.row = row
    game.selected.second.column = col

    setTimeout(() => {
        const fr = game.selected.first.row
        const fc = game.selected.first.column

        if (fr === null || fc === null) return UnselectTiles()

        const tile1 = game.tiles[fr][fc]
        const tile2 = game.tiles[row][col]

        if (!tile1 || !tile2 || tile1 !== tile2) return UnselectTiles()

        game.cleared.push({ row: fr, column: fc })
        game.cleared.push({ row, column: col })

        UnselectTiles()
    }, 250)
}

useGameName().value = 'Memory Match'
definePageMeta({
    layout: 'game',
})
</script>

<template>
    <div v-if="!game.playing" class="flex flex-col items-center gap-4">
        <b-button icon="fluent:games-24-regular" @click="StartGame">
            Play
        </b-button>

        <div class="flex gap-2 items-center">
            <b-button
                class="h-5! text-sm p-0.5!"
                shape="square"
                :icon="
                    game.settings.tiles === 16
                        ? 'fluent:checkmark-16-regular'
                        : 'fluent:dismiss-16-regular'
                "
                @click="HardnessChecked"
            />

            Easier mode
        </div>
    </div>

    <div v-else class="flex flex-col gap-2">
        <div class="flex justify-between">
            <b-button
                type="text"
                icon="fluent:arrow-counterclockwise-24-regular"
                @click="StartGame"
            >
                Restart
            </b-button>

            <span>
                {{ dayjs(game.time).format('mm:ss') }}
            </span>

            <b-button
                type="text"
                icon="fluent:power-20-regular"
                danger
                @click="EndGame"
            >
                End Game
            </b-button>
        </div>

        <div class="flex flex-col-reverse gap-2 select-none">
            <span
                v-for="(tiles, row) of game.tiles"
                :key="row"
                class="flex gap-2"
            >
                <span v-for="(tile, col) of tiles" :key="col" class="relative">
                    <b-button
                        class="text-2xl sm:text-3xl md:text-4xl"
                        :class="[
                            isTileCleared(row, col) || isTileSelected(row, col)
                                ? ''
                                : 'text-transparent',
                        ]"
                        :size="isBigScreen ? 'massive' : 'larger'"
                        shape="square"
                        @click="TileClicked(row, col)"
                    >
                        {{ tile }}
                    </b-button>
                </span>
            </span>
        </div>
    </div>
</template>
