const db = require("../../database/db_pixel.js");
const { DataTypes } = require("sequelize");

const BranchModel = db.define(
  "sucursales",
  {
    ID_NEGOCIO: { type: DataTypes.INTEGER },
    ID_SUCURSAL: { type: DataTypes.INTEGER },
    NOMBRE_SUCURSAL: { type: DataTypes.STRING },
    NOMBRE_CORTO: { type: DataTypes.STRING },
    ACTIVO: { type: DataTypes.STRING }
  },
  {
    timestamps: false,
    tableName: "sucursales",
  }
);

module.exports = BranchModel;
