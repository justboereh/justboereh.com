import type { Service } from './types'

export default [
    {
        name: 'Firestore',
        org: 'Firebase',
        pricing: {
            always_free: {
                storage: 1_000_000,
                writes: 600_000,
                deletes: 600_000,
                reads: 600_000,
                lists: 0,
            },
            paid: [
                {
                    free: {
                        storage: 1_000_000,
                        writes: 600_000,
                        deletes: 600_000,
                        reads: 600_000,
                        lists: 0,
                    },
                    price: {
                        storage: 0.000001725,
                        writes: 0.000001042,
                        deletes: 0.000000115,
                        reads: 0.000000345,
                        lists: 0,
                    },
                    starting: 0,
                    max: {
                        storage: Infinity,
                        deletes: Infinity,
                        writes: Infinity,
                        reads: Infinity,
                        lists: 0,
                    },
                },
            ],
        },
    },
    {
        name: 'DynamoDB',
        org: 'Amazon Web Services',
        pricing: {
            always_free: {
                storage: 2_500_000,
                writes: 0,
                deletes: 0,
                reads: 2_500_000,
                lists: 0,
            },
            paid: [
                {
                    free: {
                        storage: 2_500_000,
                        writes: 0,
                        deletes: 0,
                        reads: 2_500_000,
                        lists: 0,
                    },
                    price: {
                        storage: 0.00000025,
                        writes: 0.00000125,
                        deletes: 0,
                        reads: 0.00000025,
                        lists: 0,
                    },
                    starting: 0,
                    max: {
                        storage: Infinity,
                        deletes: 0,
                        writes: Infinity,
                        reads: Infinity,
                        lists: 0,
                    },
                },
            ],
        },
    },
] satisfies Service[]
