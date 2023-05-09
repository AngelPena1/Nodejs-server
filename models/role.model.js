const db = require('../database/db.js')
const {DataTypes} = require('sequelize')

const RoleModel = db.define('roles', {
    name: {type: DataTypes.STRING},
    code: {type: DataTypes.INTEGER}
})

module.exports = RoleModel