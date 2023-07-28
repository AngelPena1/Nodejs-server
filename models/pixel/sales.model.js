const db = require("../../database/db.js");
const { DataTypes } = require("sequelize");

const SalesModel = db.define(
  "VENTAS",
  {
    ID_NEGOCIO: { type: DataTypes.INTEGER },
    ID_SUCURSAL: { type: DataTypes.INTEGER },
    OPENDATE: { type: DataTypes.DATE },
    EMPNAME: { type: DataTypes.INTEGER },
    DESCRYPT: { type: DataTypes.STRING },
    TENDER: { type: DataTypes.DECIMAL },
    CAMBIO: { type: DataTypes.DECIMAL },
  },
  {
    timestamps: false,
    tableName: "VENTAS",
  }
);

module.exports = SalesModel;
