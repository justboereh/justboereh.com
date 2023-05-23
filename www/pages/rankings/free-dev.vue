<script setup lang="ts">
import { Terms, Functions, Databases } from '@/assets/free-dev/index'
import { TTerms, Service } from '@/assets/free-dev/types'
import Card from 'primevue/card'
import Checkbox from 'primevue/checkbox'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import InputNumber from 'primevue/inputnumber'
import TabPanel from 'primevue/tabpanel'
import TabView from 'primevue/tabview'
import { FilterMatchMode } from 'primevue/api'

const Services: Record<string, any> = { Functions, Databases }
const settings = reactive({
    max_cost: 100,
    only_free: false,
    selected_tab: Object.keys(Services)[0],
})

const defaultTerms: TTerms = {}
Object.keys(Terms).forEach((k) => (defaultTerms[k] = Terms[k].default))
const terms = reactive(defaultTerms)

const rankings = computed(() => {
    let result = Services[settings.selected_tab].default || []

    result.map((service: Service) => {
        service.cost = 0

        if (settings.only_free) {
            for (const term of Object.keys(Terms)) {
                const value = service.pricing.always_free[term]

                if (!value) continue
                if ((terms[term] as number) < value) continue

                return null
            }

            return service
        }

        console.log(service.org, '     lol')

        let plan

        for (let index = 0; index < service.pricing.paid.length; index++) {
            plan = service.pricing.paid[index]

            if (!plan) return null
            if (!isTermsOverused(plan.max)) break
        }

        if (!plan) return null

        service.cost = plan.starting

        for (const term of Object.keys(Terms)) {
            const price = plan.price[term]
            const free = plan.free[term]

            if (!free || !price) continue

            const cost = ((terms[term] as number) - free) * price

            service.cost += Math.max(cost, 0)
        }

        return service
    })

    result = result.filter((service: Service) => !!service)
    result = result.sort((a: Service, b: Service) => {
        return (a.cost as number) - (b.cost as number)
    })

    return result
})

function UpdateRAM() {
    if (!terms.ram) return

    const round = Math.round(Math.log(terms.ram) / Math.log(2))
    const power = Math.pow(2, round)

    terms.ram = power < 128 ? 128 : power
}

function isTermsOverused(maxUsages: TTerms) {
    if (!maxUsages) return true

    for (const term of Object.keys(Terms)) {
        const value = maxUsages[term]

        if (!value) continue
        if ((terms[term] as number) < value) continue

        return true
    }
}

function SelectTab({ index }: { index: number }) {
    settings.selected_tab = Object.keys(Services)[index]
}

useHead({
    htmlAttrs: {
        style: 'font-size: 12px',
    },
    title: 'Rankings: Free for Developers',
})
</script>

<template>
    <div class="p-4">
        <div class="max-w-6xl mx-auto grid md:grid-cols-2 gap-4 lg:gap-8">
            <Card>
                <template #title>Services</template>
                <template #content>
                    <TabView
                        :pt="{
                            panelContainer: {
                                style: 'background: none; padding: 1rem 0',
                            },
                        }"
                        @tab-change="SelectTab"
                    >
                        <TabPanel header="Functions">
                            <div class="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <label class="block">
                                        Requests per month
                                    </label>
                                    <div class="p-inputgroup flex-1">
                                        <InputNumber
                                            v-model="terms.units"
                                            :useGrouping="false"
                                            :min="0"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label class="block">
                                        Avg. request time
                                    </label>

                                    <div class="p-inputgroup flex-1">
                                        <InputNumber
                                            v-model="terms.request_time"
                                            :useGrouping="false"
                                            :min="10"
                                        />

                                        <span class="p-inputgroup-addon">
                                            ms
                                        </span>
                                    </div>
                                </div>

                                <div>
                                    <label class="block">
                                        RAM (power of 2, min. 128)
                                    </label>

                                    <div class="p-inputgroup flex-1">
                                        <InputNumber
                                            v-model="terms.ram"
                                            :useGrouping="false"
                                            :min="128"
                                            :step="128"
                                            @update:model-value="UpdateRAM"
                                        />

                                        <span class="p-inputgroup-addon">
                                            MB
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </TabPanel>
                    </TabView>
                </template>
            </Card>

            <Card>
                <template #title>Settings</template>
                <template #content>
                    <div class="grid sm:grid-cols-2 gap-4">
                        <div>
                            <Checkbox
                                v-model="settings.only_free"
                                :binary="true"
                            />
                            <label> Only include "Always Free" </label>
                        </div>

                        <div>
                            <label class="block"> Maximum cost </label>

                            <div class="p-inputgroup flex-1">
                                <span class="p-inputgroup-addon"> $ </span>

                                <InputNumber
                                    v-model="settings.max_cost"
                                    :useGrouping="false"
                                    :min="0"
                                />
                            </div>
                        </div>
                    </div>
                </template>
            </Card>

            <Card class="md:col-span-2">
                <template #title>Rankings</template>
                <template #content>
                    <DataTable
                        :filters="{
                            cost: {
                                value: settings.max_cost,
                                matchMode:
                                    FilterMatchMode.LESS_THAN_OR_EQUAL_TO,
                            },
                        }"
                        :value="rankings"
                        class="p-datatable-sm"
                    >
                        <Column field="cost" header="Cost">
                            <template #body="{ data }">
                                ${{ data.cost.toFixed(2) }}
                            </template>
                        </Column>
                        <Column field="name" header="Name"></Column>
                        <Column field="org" header="Organization"></Column>
                    </DataTable>
                </template>
            </Card>
        </div>
    </div>
</template>
