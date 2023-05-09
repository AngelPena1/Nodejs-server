const db = require('../database/db.js')
const {DataTypes} = require('sequelize')

const PersonModel = db.define('persons', {
    firstname: {type: DataTypes.STRING},
    lastname: {type: DataTypes.STRING},
    birthdate: {type: DataTypes.DATE},
    gender: {type: DataTypes.STRING},
    phone: {type: DataTypes.STRING}
})


module.exports = PersonModel