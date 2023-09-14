<script setup>
import { Calculate, Services } from '@/assets/free-dev/functions'
import InputNumber from 'primevue/inputnumber'
import Checkbox from 'primevue/checkbox'

const RequestUnits = ref(10)
const AverageRequestTime = ref(10)
const RAM = ref(128)
const AlwaysFree = ref(false)

const result = computed(() =>
    Services.map((service) => {
        return {
            ...service,
            cost: Calculate({
                service,
                data: {
                    units: RequestUnits.value,
                    always_free: AlwaysFree.value,
                },
            }),
        }
    })
)

function updateRAM() {
    const round = Math.round(Math.log(RAM.value) / Math.log(2))
    const power = Math.pow(2, round)

    RAM.value = power < 128 ? 128 : power
}
</script>

<template>
    <div class="grid grid-cols-2 gap-4">
        <div>
            <label class="block"> Request units per month </label>
            <InputNumber
                v-model="RequestUnits"
                :useGrouping="false"
                suffix=" thousands"
                :min="0"
            />
        </div>

        <div>
            <label class="block"> Avg. request time </label>
            <InputNumber
                v-model="AverageRequestTime"
                :useGrouping="false"
                suffix=" ms"
                :min="10"
            />
        </div>

        <div>
            <label class="block"> RAM (power of 2, min. 128) </label>
            <InputNumber
                v-model="RAM"
                suffix=" MB"
                :useGrouping="false"
                :min="128"
                :step="128"
                @update:model-value="updateRAM"
            />
        </div>

        <div>
            <label class="block"> RAM (power of 2, min. 128) </label>
            <InputNumber
                v-model="RAM"
                suffix=" MB"
                :useGrouping="false"
                :min="128"
                :step="128"
                @update:model-value="updateRAM"
            />
        </div>

        {{ result }}
    </div>
</template>
