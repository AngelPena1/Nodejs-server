const db = require("../../database/db.js");
const { DataTypes } = require("sequelize");
const BusinessModel = require('./business.model.js')

const UserModel = db.define(
  "USUARIOS",
  {
    ID_NEGOCIO: { type: DataTypes.INTEGER },
    USUARIO: { type: DataTypes.STRING },
    CLAVE: { type: DataTypes.STRING },
    ACTIVO: { type: DataTypes.STRING },
    MULTINEGOCIO: { type: DataTypes.STRING},
    CODIGOMULTINEGOCIO: { type: DataTypes.INTEGER}
  },
  {
    timestamps: false,
    tableName: "USUARIOS",
    id: "ID_NEGOCIO"
  }
);

UserModel.belongsTo(BusinessModel, {
  foreignKey: 'ID_NEGOCIO' 
});

module.exports = UserModel;
