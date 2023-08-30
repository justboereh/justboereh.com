import { movies } from '#utils/database.schema'
import { drizzle } from '#utils/database'

export default defineEventHandler(async (event) => {
    return await drizzle
        .select({
            id: movies.id,
            title: movies.title,
            poster: movies.poster,
            special: movies.special,
            released: movies.released,
        })
        .from(movies)
})
