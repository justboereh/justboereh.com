import { TTerms } from './types'

export * as Functions from './functions'
export * as Databases from './databases'

export const Organizations = {
    'Amazon Web Services': { color: '#ff9900' },
    'Back4App Inc': { color: '#27AE60' },
    Cloudflare: { color: '#f38020' },
    'Configure.it': { color: '#4dadf2' },
    'Cyclic Software': { color: '#e83e8c' },
    Deno: { color: '#12124B' },
    Firebase: { color: '#4285f4' },
    Klaviyo: { color: '#799A92' },
    'Micro Services Network Limited': { color: '#4f46e5' },
    'Microsoft Azure': { color: '#00a1f1' },
    'Northflank Ltd.': { color: '#0093ff' },
    'Pipedream, Inc.': { color: '#33AAFF' },
    'Serverless, Inc.': { color: '#fd5750' },
    'WunderGraph, Inc.': { color: '#EC4899' },
    YepCode: { color: '#b84ef4' },
}

export const Terms: Record<string, { default: number; desc: string }> = {
    // Functions
    units: { default: 0, desc: 'Function request units per month' },
    request_time: { default: 0, desc: 'Function average request time' },
    ram: { default: 128, desc: 'Function RAM' },

    // Databases
    storage: { default: 0, desc: 'Database storage per month' },
    writes: { default: 0, desc: 'Database writes units per month' },
    deletes: { default: 0, desc: 'Database deletes units per month' },
    reads: { default: 0, desc: 'Database reads units per month' },
    lists: { default: 0, desc: 'Database lists units per month' },
}
