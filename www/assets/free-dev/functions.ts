import type { Service } from './types'

export default [
    {
        name: 'Workers Bundled',
        org: 'Cloudflare',
        pricing: {
            always_free: { units: 3e6, request_time: 10 },
            paid: [
                {
                    free: { units: 3e6, request_time: 50 },
                    max: { units: Infinity },
                    starting: 5,
                    price: { units: 15e-7 },
                },
            ],
        },
    },
    {
        name: 'Workers Unbound',
        org: 'Cloudflare',
        pricing: {
            always_free: { units: 3e6, request_time: 10 },
            paid: [
                {
                    free: { units: 10e6, gb_seconds: 4e5 },
                    max: { units: Infinity },
                    starting: 5,
                    price: { units: 15e-7, gb_seconds: 125e-5 },
                },
            ],
        },
    },
    {
        name: 'Functions',
        org: 'Firebase',
        pricing: {
            always_free: { units: -1 },
            paid: [
                {
                    free: { units: 2e6 },
                    max: { units: Infinity },
                    starting: 0,
                    price: { units: 4e-7 },
                },
            ],
        },
    },
    {
        name: 'Lambda x86',
        org: 'Amazon Web Services',
        pricing: {
            always_free: { units: 1e6, gb_seconds: 4e5 },
            paid: [
                {
                    free: { units: 1e6, gb_seconds: 4e5 },
                    max: { units: Infinity, gb_seconds: 9e9 },
                    starting: 0,
                    price: { units: 2e-1, gb_seconds: 166667e-10 },
                },
                {
                    free: { units: 1e6, gb_seconds: 4e5 },
                    max: { units: Infinity, gb_seconds: 15e9 },
                    starting: 0,
                    price: { units: 2e-1, gb_seconds: 15e-6 },
                },
                {
                    free: { units: 1e6, gb_seconds: 4e5 },
                    max: { units: Infinity, gb_seconds: Infinity },
                    starting: 0,
                    price: { units: 2e-1, gb_seconds: 133334e-10 },
                },
            ],
        },
    },
    {
        name: 'Lambda Arm',
        org: 'Amazon Web Services',
        pricing: {
            always_free: { units: 1e6, gb_seconds: 4e5 },
            paid: [
                {
                    free: { units: 1e6, gb_seconds: 4e5 },
                    max: { units: Infinity, gb_seconds: 11.25e9 },
                    starting: 0,
                    price: { units: 2e-1, gb_seconds: 133334e-10 },
                },
                {
                    free: { units: 1e6, gb_seconds: 4e5 },
                    max: { units: Infinity, gb_seconds: 18.75e9 },
                    starting: 0,
                    price: { units: 2e-1, gb_seconds: 120001e-10 },
                },
                {
                    free: { units: 1e6, gb_seconds: 4e5 },
                    max: { units: Infinity, gb_seconds: Infinity },
                    starting: 0,
                    price: { units: 2e-1, gb_seconds: 106667e-10 },
                },
            ],
        },
    },
    {
        name: 'Lambda@Edge',
        org: 'Amazon Web Services',
        pricing: {
            always_free: {},
            paid: [
                {
                    free: {},
                    max: { units: Infinity, gb_seconds: Infinity },
                    starting: 0,
                    price: { units: 6e-1, gb_seconds: 5001e-8 },
                },
            ],
        },
    },
    {
        name: 'Functions',
        org: 'Microsoft Azure',
        pricing: {
            always_free: { units: 1e6 },
            paid: [
                {
                    free: { units: 1e6, request_time: 4e5 },
                    max: { units: Infinity },
                    starting: 0,
                    price: { units: 2e-7 },
                },
            ],
        },
    },
    {
        name: 'Deploy',
        org: 'Deno',
        pricing: {
            always_free: { units: 3e3 },
            paid: [
                {
                    free: { units: 5e3 },
                    max: { units: Infinity },
                    starting: 10,
                    price: { units: 2e-5 },
                },
            ],
        },
    },
    {
        name: 'cyclic',
        org: 'Cyclic Software',
        pricing: {
            always_free: { units: 10e6 },
            paid: [
                {
                    free: { units: 10e6 },
                    max: { units: Infinity },
                    starting: 3,
                    price: { units: 5e-5 },
                },
            ],
        },
    },
    {
        name: 'Configure.it',
        org: 'Configure.it',
        pricing: {
            always_free: { units: 1e4 },
            paid: [
                {
                    free: { units: 1e4 },
                    max: { units: 1e4 },
                    starting: 9,
                    price: { units: 0 },
                },
                {
                    free: { units: 5e4 },
                    max: { units: 5e4 },
                    starting: 49,
                    price: { units: 0 },
                },
            ],
        },
    },
    {
        name: 'M3O',
        org: 'Micro Services Network Limited',
        pricing: {
            always_free: { units: 1e3 },
            paid: [
                {
                    free: { units: 5_01e4 },
                    max: { units: 5_01e4 },
                    starting: 10,
                    price: { units: 0 },
                },
                {
                    free: { units: 15_1e5 },
                    max: { units: 15_1e5 },
                    starting: 35,
                    price: { units: 0 },
                },
                {
                    free: { units: 46e6 },
                    max: { units: 46e6 },
                    starting: 95,
                    price: { units: 0 },
                },
            ],
        },
    },

    {
        name: 'Pipedream',
        org: 'Pipedream, Inc.',
        pricing: {
            always_free: { units: 1e4 },
            paid: [
                {
                    free: { units: 1e4 },
                    max: { units: Infinity },
                    starting: 20,
                    price: { units: 0.0008 },
                },
                {
                    free: { units: 5e4 },
                    max: { units: Infinity },
                    starting: 50,
                    price: { units: 0.0004 },
                },
                {
                    free: { units: 25e4 },
                    max: { units: Infinity },
                    starting: 100,
                    price: { units: 0.0002 },
                },
            ],
        },
    },
    {
        name: 'Serverless',
        org: 'Serverless, Inc.',
        pricing: {
            always_free: { units: 1e5 },
            paid: [
                {
                    free: { units: 0 },
                    max: { units: Infinity },
                    starting: 8,
                    price: { units: 0.00008 },
                },
            ],
        },
    },
    {
        name: 'Napkin',
        org: 'Klaviyo',
        pricing: {
            always_free: { units: 5e3 },
            paid: [
                {
                    free: { units: 5e5 },
                    max: { units: 5e5 },
                    starting: 10,
                    price: { units: 0 },
                },
            ],
        },
    },
    {
        name: 'YepCode',
        org: 'YepCode',
        pricing: {
            always_free: { units: 5e3 },
            paid: [
                {
                    free: { units: 0 },
                    max: { units: 5e3 },
                    starting: 0,
                    price: { units: 0 },
                },
                {
                    free: { units: 25e3 },
                    max: { units: 25e4 },
                    starting: 99,
                    price: { units: 0.0005 },
                },
                {
                    free: { units: 25e4 },
                    max: { units: Infinity },
                    starting: 499,
                    price: { units: 0.0005 },
                },
            ],
        },
    },
    {
        name: 'WunderGraph',
        org: 'WunderGraph, Inc.',
        pricing: {
            always_free: { units: 1e5 },
            paid: [
                {
                    free: { units: 1e6 },
                    max: { units: Infinity },
                    starting: 25,
                    price: { units: 0.00001 },
                },
            ],
        },
    },
    {
        name: 'back4app',
        org: 'Back4App Inc',
        pricing: {
            always_free: { units: 25e3 },
            paid: [
                {
                    free: { units: 5e5 },
                    max: { units: 5e5 },
                    starting: 25,
                    price: { units: 0.00005 },
                },
                {
                    free: { units: 5e5 },
                    max: { units: 5e6 },
                    starting: 100,
                    price: { units: 0.00002 },
                },
                {
                    free: { units: Infinity },
                    max: { units: Infinity },
                    starting: 500,
                    price: { units: 0 },
                },
            ],
        },
    },
] satisfies Service[]
