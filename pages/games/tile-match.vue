<script setup lang="ts">
import { cloneDeep } from 'lodash'

type Game = {
    playing: boolean
    movable: boolean
    tiles: (string | null)[][]
    selected: {
        row: number | null
        column: number | null
        error: boolean
    }
    settings: {
        rows: number
        columns: number
    }
}

const emojis = ['😀', '🤬', '🤣', '🤡', '😈', '👽']
const game = reactive<Game>({
    playing: false,
    movable: true,
    tiles: [],
    selected: {
        row: null,
        column: null,
        error: false,
    },
    settings: {
        rows: 6,
        columns: 6,
    },
})
const isTileSelected = computed(() => {
    return (row: number, col: number) => {
        return row === game.selected.row && game.selected.column === col
    }
})
const showTileArrow = computed(() => (row: number, col: number) => {})

function ChooseEmoji() {
    return emojis[Math.floor(Math.random() * emojis.length)]
}

type LoopTilesCallbackArg = {
    row: number
    col: number
    tile: string | null
}

function LoopTiles(
    tiles: (string | null)[][],
    callback: (arg: LoopTilesCallbackArg) => void
) {
    for (let row = 0; row < game.settings.rows; row++) {
        for (let col = 0; col < game.settings.columns; col++) {
            try {
                callback({
                    row,
                    col,
                    tile: tiles[row][col],
                })
            } catch (error) {
                return
            }
        }
    }
}

function FillTiles() {
    LoopTiles(game.tiles, ({ row, col, tile }) => {
        if (tile) return Error()

        const isTopRow = row === game.settings.rows - 1

        if (isTopRow) {
            game.tiles[row][col] = ChooseEmoji()

            return Error()
        }

        const aboveRowTile = game.tiles[row + 1][col]

        if (!isTopRow && !aboveRowTile) {
            game.tiles[row][col] = ChooseEmoji()

            return Error()
        }

        if (!isTopRow && aboveRowTile) {
            game.tiles[row][col] = aboveRowTile
            game.tiles[row + 1][col] = null
        }
    })
}

function CheckMatches(tiles: (string | null)[][]): void {
    game.movable = false

    function LoopOccurrences(switched?: boolean, cb?: (tile: string) => void) {
        const rows = switched ? game.settings.columns : game.settings.rows
        const cols = switched ? game.settings.rows : game.settings.columns

        for (let row = 0; row < rows; row++) {
            let last = null
            let occurrences = 1

            for (let col = 0; col < cols; col++) {
                const tile = tiles[row][col]

                if (!tile) {
                    occurrences = 1
                    last = tile

                    continue
                }

                console.log(row, col, occurrences)

                if (!last) {
                    occurrences = 1
                    last = tile

                    console.log(tiles[switched ? row : col][col], '!last')
                    continue
                }

                if (col < cols - 1) {
                    if (last === tile) {
                        occurrences++

                        continue
                    }

                    if (occurrences < 3) {
                        occurrences = 1
                        last = tile

                        console.log(tiles[row][col], 'occur < 3')
                        continue
                    }

                    for (let i = 1; i < occurrences + 1; i++) {
                        tiles[row][col - i] = null
                    }
                } else {
                    if (last !== tile) {
                        occurrences = 1
                        last = tile

                        continue
                    }

                    if (occurrences < 2) {
                        occurrences = 1
                        last = null

                        console.log(
                            tiles[row][col],
                            'occur < 3 nad last in row'
                        )
                        continue
                    }

                    for (let i = 0; i <= occurrences; i++) {
                        tiles[row][col - i] = null
                    }
                }
            }
        }

        return true
    }

    if (!LoopOccurrences()) return
    if (!LoopOccurrences(true)) return

    game.tiles = tiles
    UnselectTile()
    game.movable = true
}

function StartGame() {
    game.movable = false
    game.playing = true
    game.tiles = [...Array(game.settings.rows)].map(() => [])

    FillTiles()

    setTimeout(() => CheckMatches(game.tiles), 500)
}

function EndGame() {
    game.movable = false
    game.playing = false
    game.tiles = []
}

function UnselectTile() {
    game.selected.column = null
    game.selected.row = null
    game.movable = true
}

function TileClicked(row: number, col: number) {
    if (!game.movable) return
    if (!game.tiles[row][col]) return

    game.selected.error = false

    if (isTileSelected.value(row, col)) return UnselectTile()

    game.selected.column = col
    game.selected.row = row
}

function MoveTile(
    row: number,
    col: number,
    dir: 'up' | 'down' | 'left' | 'right'
) {
    game.movable = false
    if (!isTileSelected.value(row, col)) return UnselectTile()

    const otherTile = { row, col }

    if (dir === 'up') otherTile.row += 1
    if (dir === 'down') otherTile.row -= 1
    if (dir === 'right') otherTile.col += 1
    if (dir === 'left') otherTile.col -= 1

    if (!game.tiles[otherTile.row][otherTile.col]) return UnselectTile()

    const tiles = cloneDeep(game.tiles)

    tiles[otherTile.row][otherTile.col] = tiles[row][col]
    tiles[row][col] = game.tiles[otherTile.row][otherTile.col]

    CheckMatches(tiles)
}

useGameName().value = 'Tile Match'
definePageMeta({
    layout: 'game',
})
</script>

<template>
    <b-button
        v-if="!game.playing"
        icon="fluent:games-24-regular"
        @click="StartGame"
    >
        Play
    </b-button>

    <div v-else>
        <div class="flex justify-between">
            <b-button
                type="text"
                icon="fluent:arrow-counterclockwise-24-regular"
                @click="StartGame"
            >
                Restart
            </b-button>

            <b-button
                type="text"
                icon="fluent:power-20-regular"
                danger
                @click="EndGame"
            >
                End Game
            </b-button>
        </div>

        <br />

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
                            // prettier-ignore
                            game.selected.row === null || isTileSelected(row, col) ? '' : `pointer-events-none opacity-25`,
                            tile === null ? 'text-transparent' : '',
                        ]"
                        shape="square"
                        @click="TileClicked(row, col)"
                    >
                        {{ tile || '&nbsp;' }}
                    </b-button>

                    <span
                        v-if="isTileSelected(row, col)"
                        class="absolute w-full h-full top-0 pointer-events-none"
                    >
                        <span class="relative w-full h-full block">
                            <b-button
                                v-if="
                                    row < game.settings.rows - 1 &&
                                    game.tiles[row + 1][col] !== null
                                "
                                class="absolute left-1/2 -top-11 transfrom -translate-x-1/2 z-10 pointer-events-auto"
                                icon="fluent:arrow-up-20-regular"
                                shape="square"
                                @click="MoveTile(row, col, 'up')"
                            />

                            <b-button
                                v-if="
                                    row > 0 && game.tiles[row - 1][col] !== null
                                "
                                class="absolute left-1/2 -bottom-11 transfrom -translate-x-1/2 z-10 pointer-events-auto"
                                icon="fluent:arrow-down-20-regular"
                                shape="square"
                                @click="MoveTile(row, col, 'down')"
                            />

                            <b-button
                                v-if="
                                    col < game.settings.columns - 1 &&
                                    game.tiles[row][col + 1] !== null
                                "
                                class="absolute top-1/2 -right-11 transfrom -translate-y-1/2 z-10 pointer-events-auto"
                                icon="fluent:arrow-right-20-regular"
                                shape="square"
                                @click="MoveTile(row, col, 'right')"
                            />

                            <b-button
                                v-if="
                                    col > 0 && game.tiles[row][col - 1] !== null
                                "
                                class="absolute top-1/2 -left-11 transfrom -translate-y-1/2 z-10 pointer-events-auto"
                                icon="fluent:arrow-left-20-regular"
                                shape="square"
                                @click="MoveTile(row, col, 'left')"
                            />
                        </span>
                    </span>
                </span>
            </span>
        </div>
    </div>
</template>
