const {Sequelize} = require('sequelize')
const env = require('../utils/database_pixel.js')

const db_pixel = new Sequelize(
    env.DB_PIXEL_DATABASE, //database name
    env.DB_PIXEL_USERNAME, // username
    env.DB_PIXEL_PASSWORD,//password
    { 
        host: env.DB_PIXEL_HOST, 
        port: env.DB_PIXEL_PORT,
        dialect: env.DB_PIXEL_DIALECT,
        logging: false
    }
)

module.exports = db_pixel