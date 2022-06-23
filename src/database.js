const { Sequelize, DataTypes } = require('sequelize')
const dotenv = require('dotenv')

// load env vars
dotenv.config({ path: __dirname + '/.env' })

// environment variable
const { DB_DIALECT, DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE } =
  process.env

const database = new Sequelize({
  dialect: DB_DIALECT,
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
})

module.exports = { database, DataTypes }
