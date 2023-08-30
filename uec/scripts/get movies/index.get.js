/**
 * @do Move to /server/api/ to upload the movies after fetching
 */

// import moviesJSON from '../../../scripts/get movies/movies.json'

// import { movies } from '#utils/database.schema'
// import { drizzle } from '#utils/database'

// export default defineEventHandler(async () => {
//     const ids = await drizzle
//         .select({
//             id: movies.id,
//         })
//         .from(movies)

//     const idsMapped = ids.map(({ id }) => id)

//     const filteredMovies = [...moviesJSON].filter(
//         (x) => !idsMapped.includes(x.id)
//     )

//     for (const movie of filteredMovies) {
//         await drizzle.insert(movies).values({
//             id: movie.id,
//             title: movie.title,
//             description: movie.description,
//             genre: movie.genre,
//             director: movie.director,
//             actors: movie.actors,
//             mpaa: movie.mpaa,
//             runtime: movie.runtime,
//             released: new Date(movie.released),
//             special: movie.special,
//             youtube: movie.youtube || 'null',
//             poster: movie.poster,
//         })
//     }
// })
