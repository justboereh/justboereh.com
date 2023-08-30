import { drizzle as Drizzle } from 'drizzle-orm/planetscale-serverless'
import { connect } from '@planetscale/database'
import { Sequelize, DataTypes } from 'sequelize'
import Knex from 'knex'
import postgres from 'postgres'

export const knex = Knex({
    client: 'pg',
    connection: process.env.DATABASE_URL,
})

export const connection = connect({
    host: process.env.PS_HOST,
    username: process.env.PS_USERNAME,
    password: process.env.PS_PASSWORD,
})

export const drizzle = Drizzle(connection)

// const sequelize = new Sequelize(process.env.DATABASE_URL)

// export const MoviesModel = sequelize.define('movies', {
//     id: {
//         type: DataTypes.INTEGER,
//         autoIncrement: true,
//         allowNull: false,
//         primaryKey: true,
//     },
//     title: {
//         type: DataTypes.TEXT,
//         allowNull: false,
//     },
//     description: {
//         type: DataTypes.TEXT,
//         allowNull: false,
//     },
//     genre: {
//         type: DataTypes.JSON,
//         allowNull: false,
//     },
//     director: {
//         type: DataTypes.JSON,
//         allowNull: false,
//     },
//     actors: {
//         type: DataTypes.JSON,
//         allowNull: false,
//     },
//     mpaa: {
//         type: DataTypes.TEXT,
//         allowNull: false,
//     },
//     runtime: {
//         type: DataTypes.SMALLINT,
//         allowNull: false,
//     },
//     released: {
//         type: DataTypes.DATE,
//         allowNull: false,
//     },
//     special: {
//         type: DataTypes.BOOLEAN,
//         allowNull: false,
//     },
//     youtube: {
//         type: DataTypes.TEXT,
//         allowNull: false,
//     },
//     poster: {
//         type: DataTypes.TEXT,
//         allowNull: false,
//     },
// })

// export const TheatresModel = sequelize.define('theatres', {
//     id: {
//         type: DataTypes.INTEGER,
//         autoIncrement: true,
//         allowNull: false,
//         primaryKey: true,
//     },
//     name: { type: DataTypes.TEXT, allowNull: false },
//     features: { type: DataTypes.JSON, allowNull: false },
//     concessions: { type: DataTypes.JSON, allowNull: false },
//     state: { type: DataTypes.TEXT, allowNull: false },
//     phone: { type: DataTypes.INTEGER, allowNull: false },
//     address: { type: DataTypes.TEXT, allowNull: false },
//     pricing: { type: DataTypes.JSON, allowNull: false },
// })

// export const ShowingModel = sequelize.define('showing', {
//     id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         allowNull: false,
//         autoIncrement: true,
//     },
//     movie_id: { type: DataTypes.INTEGER, allowNull: false },
//     theatre_id: { type: DataTypes.INTEGER, allowNull: false },
//     time: { type: DataTypes.INTEGER, allowNull: false },
//     date: { type: DataTypes.DATE, allowNull: false },
// })
