const path = require('path')
const dotenv = require('dotenv')
const data = dotenv.config({
    path: path.resolve(__dirname, `../environments/.env.${process.env.NODE_ENV}`)
});

module.exports = {
    DB_USERNAME: data.parsed.DB_USERNAME,
    DB_PASSWORD: data.parsed.DB_PASSWORD,
    DB_HOST: data.parsed.DB_HOST,
    DB_DATABASE: data.parsed.DB_DATABASE,
    DB_DIALECT: data.parsed.DB_DIALECT,
    DB_PORT: data.parsed.DB_PORT
}

