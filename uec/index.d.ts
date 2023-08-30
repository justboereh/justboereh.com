declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PLANETSCALE_CONNECTION: string
            DATABASE_URL: string
            PS_HOST: string
            PS_PASSWORD: string
            PS_USERNAME: string
        }
    }
}

export {}
