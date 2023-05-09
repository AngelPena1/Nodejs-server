const db = require('../database/db.js')
const {DataTypes} = require('sequelize')
const RoleModel = require('./role.model')

const RoleUserModel = db.define('role_users', {
    user_Id: {type: DataTypes.INTEGER},
    role_Id: {type: DataTypes.INTEGER}
})

RoleUserModel.belongsTo(RoleModel, {
    foreignKey: 'role_Id'    
});

module.exports = RoleUserModel