import {
    mysqlTable,
    text,
    date,
    int,
    json,
    boolean,
} from 'drizzle-orm/mysql-core'

export const movies = mysqlTable('movies', {
    id: int('id').notNull().autoincrement().primaryKey(),
    title: text('title').notNull(),
    description: text('description').notNull(),
    genre: json('genre').$type<string[]>().notNull(),
    director: text('director').$type<string[]>().notNull(),
    actors: json('actors').$type<string[]>().notNull(),
    mpaa: text('mpaa').notNull(),
    runtime: int('runtime').notNull(),
    released: date('released').notNull(),
    special: boolean('special').notNull(),
    youtube: text('youtube').notNull(),
    poster: text('poster').notNull(),
})

export const theatres = mysqlTable('theatres', {
    id: int('id').notNull().autoincrement().primaryKey(),
    name: text('name').notNull(),
    features: text('description').notNull(),
    concessions: text('description').notNull(),
    state: text('description').notNull(),
    phone: text('description').notNull(),
    address: text('description').notNull(),
    pricing: json('pricing').notNull(),
})

export const showing = mysqlTable('showing', {
    id: int('id').notNull().autoincrement().primaryKey(),
    movie_id: int('movie_id')
        .references(() => movies.id)
        .notNull(),
    theatre_id: int('theatre_id')
        .references(() => theatres.id)
        .notNull(),
    time: int('time').notNull(),
    date: date('date').notNull(),
})
