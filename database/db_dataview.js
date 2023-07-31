const {Sequelize} = require('sequelize')
const env = require('../utils/database_dataview.js')

const db = new Sequelize(
    env.DB_DATABASE, //database name
    env.DB_USERNAME, // username
    env.DB_PASSWORD,//password
    { 
        host: env.DB_HOST, 
        port: env.DB_PORT,
        dialect: env.DB_DIALECT,
        logging: false
    }
)

module.exports = db