<script setup>
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
} from 'chart.js'
import { Line } from 'vue-chartjs'
import Decimal from 'decimal.js'
import VerticalLine from './vertical-line-plugin.js'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    VerticalLine
)

const length = 20

const maxCost = useState('useFreeDevMaxCost')
const ranking = useState('useFreeDevRanking')
const Props = defineProps({
    units: {
        type: Number,
        default: 10,
    },
    services: Object,
})

const startUnits = computed(() => Math.floor(Props.units / length) * length)

const data = computed(() => {
    const labels = [...Array(length + 1)].map((_, i) => startUnits.value + i)
    const list = Props.services.Services.filter((x) => x.name !== '')

    const datasets = list
        .map((service) => {
            const data = Props.services.Calculate({
                service,
                labels,
                start: startUnits.value,
            })

            return {
                label: `${service.org} - ${service.name}`,
                borderColor: service.color,
                pointStyle: false,
                data,
            }
        })
        .filter(({ data }) => data.at(-1) <= maxCost.value)

    return {
        labels,
        datasets,
    }
})

useState('useFreeDevChartData', () => [])

const result = computed(() => {
    return data.value.datasets
        .map((service) => {
            const set = {
                name: service.label.split(' - ')[1],
                org: service.label.split(' - ')[0],
                cost: service.data.at(Props.units - startUnits.value),
                color: service.borderColor,
            }

            if (set.cost !== null) {
                set.cost = Math.floor(set.cost * 100) / 100
            }

            return set
        })
        .filter(({ cost }) => cost !== null)
        .sort((a, b) => a.cost - b.cost)
        .map((service) => {
            if (!service.cost) return service

            service.cost = new Decimal(service.cost)
                .toDecimalPlaces(2)
                .toNumber()

            return service
        })
})

const options = computed(() => {
    return {
        responsive: true,
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'RU/m',
                    font: { size: 16 },
                },
                ticks: {
                    callback: (v) => startUnits.value + v + 'K',
                    font: {
                        family: 'Roboto',
                        size: 16,
                    },
                    maxTicksLimit: 6,
                },
            },
            y: {
                display: false,
                min: 0,
                max: maxCost.value,
                ticks: {
                    callback: (v) => '$' + v,
                    font: {
                        family: 'Roboto',
                        size: 16,
                    },
                    maxTicksLimit: 7,
                },
            },
        },
        maintainAspectRatio: true,
        aspectRatio: 1,
        plugins: {
            tooltip: {
                callbacks: {
                    title: ([x]) => `${x.label}K RU/m`,
                    label: (x) => {
                        const names = x.dataset.label.split(' - ')

                        return `${names[1]} (${names[0]}) - $${x.formattedValue}`
                    },
                },
                titleFont: {
                    family: 'Roboto',
                    size: 14,
                },
                bodyFont: {
                    family: 'Roboto',
                    size: 12,
                },
            },
        },
        lineAtIndex: [Props.units - startUnits.value],
    }
})

watch(result, (v) => (ranking.value = v), { immediate: true })
</script>

<template>
    <div>
        <Line ref="ChartElement" :data="data" :options="options" />
    </div>
</template>
