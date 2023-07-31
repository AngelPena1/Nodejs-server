const path = require('path')
const dotenv = require('dotenv')
const data = dotenv.config({
    path: path.resolve(__dirname, `../environments/.env.${process.env.NODE_ENV}`)
});

module.exports = {
    DB_PIXEL_USERNAME: data.parsed.DB_PIXEL_USERNAME,
    DB_PIXEL_PASSWORD: data.parsed.DB_PIXEL_PASSWORD,
    DB_PIXEL_HOST: data.parsed.DB_PIXEL_HOST,
    DB_PIXEL_DATABASE: data.parsed.DB_PIXEL_DATABASE,
    DB_PIXEL_DIALECT: data.parsed.DB_PIXEL_DIALECT,
    DB_PIXEL_PORT: data.parsed.DB_PIXEL_PORT
}