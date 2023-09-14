<script setup lang="ts">
import Vehicles from '@/assets/rankings/vehicles/index'
import Card from 'primevue/card'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import InputNumber from 'primevue/inputnumber'
import InputText from 'primevue/inputtext'
import { FilterMatchMode, FilterOperator } from 'primevue/api'

const settings = reactive({
    max_msrp: 100000,
    min_mpg: 10,
    min_year: 2000,
    max_year: new Date().getFullYear(),
})
const expandedRows = ref()
const filters = ref({
    msrp: {
        value: settings.max_msrp,
        matchMode: FilterMatchMode.LESS_THAN_OR_EQUAL_TO,
    },
    year: {
        operator: FilterOperator.AND,
        constraints: [
            {
                value: settings.min_year,
                matchMode: FilterMatchMode.GREATER_THAN_OR_EQUAL_TO,
            },
            {
                value: settings.max_year,
                matchMode: FilterMatchMode.LESS_THAN_OR_EQUAL_TO,
            },
        ],
    },
})

const allStyles = [
    'SUV',
    'Sedan',
    'Truck',
    'Coupe',
    'CUV',
    'Sports',
    'Hatchback',
    'Wagon',
    'Convertible',
    'Minivan',
]

function AddCommas(num: number): string {
    const part1 = num
        .toString()
        .split('')
        .reverse()
        .join('')
        .match(/[\w]{1,3}/g)

    if (!part1) return ''

    return part1.join(',').split('').reverse().join('')
}

function ExapansionItem({ name, text }: { name: string; text: string }) {
    return h('span', {}, [
        h('h3', { class: 'text-white/50' }, name),
        h('p', {}, text),
    ])
}

useHead({
    title: 'Rankings: Vehicles',
})
</script>

<template>
    <div class="p-4">
        <div class="max-w-6xl mx-auto space-y-4 lg:space-y-8">
            <Card class="w-full">
                <template #title>Settings</template>
                <template #content>
                    <div class="grid sm:grid-cols-2 gap-4 p-2">
                        <div>
                            <label class="block"> Maximum MSRP </label>
                            <div class="p-inputgroup flex-1">
                                <InputNumber
                                    v-model="settings.max_msrp"
                                    inputId="currency-us"
                                    mode="currency"
                                    currency="USD"
                                    locale="en-US"
                                    :min="0"
                                />
                            </div>
                        </div>

                        <div>
                            <label class="block"> Minimum MPG </label>
                            <div class="p-inputgroup flex-1">
                                <InputNumber
                                    v-model="settings.min_mpg"
                                    :min="0"
                                />
                            </div>
                        </div>

                        <div>
                            <label class="block"> Year </label>
                            <div class="p-inputgroup flex-1">
                                <span class="p-inputgroup-addon">From</span>

                                <InputNumber
                                    v-model="settings.min_year"
                                    :useGrouping="false"
                                    :min="0"
                                />

                                <span class="p-inputgroup-addon">to</span>

                                <InputNumber
                                    v-model="settings.max_year"
                                    :useGrouping="false"
                                    :min="0"
                                />
                            </div>
                        </div>
                    </div>
                </template>
            </Card>

            <Card class="max-w-full">
                <template #title>Rankings</template>
                <template #content>
                    <DataTable
                        v-model:expandedRows="expandedRows"
                        :filters="filters"
                        :value="Vehicles"
                        class="p-datatable-sm w-full"
                        scrollable
                    >
                        <Column expander style="width: 5rem" />
                        <Column header="MSRP">
                            <template #body="{ data }">
                                ${{ AddCommas(data.msrp) }}
                            </template>
                        </Column>
                        <Column field="year" header="Year" />
                        <Column field="maker" header="Maker" />
                        <Column field="model" header="Model" />
                        <Column field="trim" header="Trim" />

                        <template #expansion="{ data }">
                            <div class="p-4 grid grid-cols-3 gap-4">
                                <ExapansionItem
                                    name="Style"
                                    :text="data.style"
                                />

                                <ExapansionItem
                                    name="Drivetrain"
                                    :text="`${data.drive} Wheel`"
                                />

                                <ExapansionItem
                                    name="Horsepower"
                                    :text="data.metadata.hp"
                                />

                                <ExapansionItem
                                    name="MPG"
                                    :text="data.metadata.mpg"
                                />

                                <ExapansionItem
                                    name="Range"
                                    :text="
                                        (
                                            data.metadata.mpg *
                                            data.metadata.fuelCapacity
                                        ).toFixed(0) + ' miles'
                                    "
                                />

                                <ExapansionItem
                                    name="$/mile"
                                    :text="
                                        (
                                            data.msrp /
                                            Math.floor(
                                                data.metadata.mpg *
                                                    data.metadata.fuelCapacity
                                            )
                                        ).toFixed(2)
                                    "
                                />
                            </div>
                        </template>
                    </DataTable>
                </template>
            </Card>
        </div>
    </div>
</template>
