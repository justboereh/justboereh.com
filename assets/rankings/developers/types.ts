export type TTerms = {
    [k: string]: number | undefined

    requestUnit?: number // Function request units
    requestTime?: number // Function avg. request time (millisecond)
    cpuSecond?: number // Function CPU usage (second)
    gbSecond?: number // Function RAM usage (second)
    ram?: number // Function RAM

    storage?: number // Database storage (megabyte)
    write?: number // Database writes
    delete?: number // Database deletes
    read?: number // Database reads
    list?: number // Database lists
}

export type PidPlan = {
    max: TTerms // maximum of each term
    price: TTerms // pricing of each term
}

export type ServiceTier = {
    alwaysFree: TTerms // free usage without credit card
    free: TTerms // free usage with credit card
    starting: number // starting cost of tier
    paid: PidPlan[]
}

export type SericeLocation = {
    name: string // Location name || "Global"
    long?: number // Longtitude of location
    lat?: number // Latitude of location
    sameAs?: string // Location pricing is similar to another location
    teirs?: ServiceTier[] // tiers within the locations
}

export type Service = {
    name: string // Name of service
    org: string // Name of organization
    cost?: number // DONOT put, for ranking
    locations: SericeLocation[] // serices locations
}
