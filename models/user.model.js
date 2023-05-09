const db = require('../database/db.js')
const {DataTypes} = require('sequelize')
const PersonModel = require('./person.model.js')

const UserModel = db.define('users', {
    person_Id: {type: DataTypes.INTEGER},
    username: {type: DataTypes.STRING},
    password: {type: DataTypes.TEXT},
    active: {type: DataTypes.BOOLEAN},
    refreshToken: {type: DataTypes.TEXT}
})

UserModel.belongsTo(PersonModel, {
    foreignKey: 'person_Id'    
});

module.exports = UserModel