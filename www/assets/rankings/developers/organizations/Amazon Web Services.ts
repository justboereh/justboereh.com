import { Service } from '../types'

const org = 'Amazon Web Services'

const Functions: Service[] = [
    {
        name: 'Lambda x86',
        org,
        locations: [
            {
                name: 'US East (N. Virginia)',
                teirs: [
                    {
                        alwaysFree: { gbSecond: 4e5, requestUnit: 1e6 },
                        free: { gbSecond: 4e5, requestUnit: 1e6 },
                        paid: [
                            {
                                max: {},
                                price: { gbSecond: 4e5, requestUnit: 1e6 },
                            },
                        ],
                        starting: 0,
                    },
                ],
            },
            { name: 'US East (Ohio)', sameAs: 'US East (N. Virginia)' },
            { name: 'US West (Northern California)' },
            { name: 'US West (Oregon)' },
            { name: 'Africa (Cape Town)' },
            { name: 'Asia Pacific (Hong Kong)' },
            { name: 'Asia Pacific (Hyderabad)' },
            { name: 'Asia Pacific (Jakarta)' },
            { name: 'Asia Pacific (Melbourne)' },
            { name: 'Asia Pacific (Mumbai)' },
            { name: 'Asia Pacific (Osaka)' },
            { name: 'Asia Pacific (Seoul)' },
            { name: 'Asia Pacific (Singapore)' },
            { name: 'Asia Pacific (Sydney)' },
            { name: 'Asia Pacific (Tokyo)' },
            { name: 'Canada (Central)' },
            { name: 'Europe (Frankfurt)' },
            { name: 'Europe (Ireland)' },
            { name: 'Europe (London)' },
            { name: 'Europe (Milan)' },
            { name: 'Europe (Paris)' },
            { name: 'Europe (Spain)' },
            { name: 'Europe (Stockholm)' },
            { name: 'Europe (Zurich)' },
            { name: 'Middle East (Bahrain)' },
            { name: 'Middle East (UAE)' },
            { name: 'South America (Sao Paulo)' },
            { name: 'AWS GovCloud (US-East)' },
            { name: 'AWS GovCloud (US-West)' },
        ],
    },
]

export default { Functions }
