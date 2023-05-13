const db = require("../database/db.js");
const { DataTypes } = require("sequelize");

const UserModel = db.define(
  "USUARIOS",
  {
    ID_NEGOCIO: { type: DataTypes.INTEGER },
    USUARIO: { type: DataTypes.STRING },
    CLAVE: { type: DataTypes.STRING },
    ACTIVO: { type: DataTypes.STRING },
  },
  {
    timestamps: false,
    tableName: "USUARIOS",
  }
);

module.exports = UserModel;
