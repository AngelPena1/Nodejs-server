const db = require("../../database/db.js");
const { DataTypes } = require("sequelize");

const SalesModel = db.define(
  "VENTAS",
  {
    ID_NEGOCIO: { type: DataTypes.INTEGER },
    ID_SUCURSAL: { type: DataTypes.INTEGER },
    FECHA: { type: DataTypes.STRING },
    NET_SLS_TTL: { type: DataTypes.DOUBLE }
  },
  {
    timestamps: false,
    tableName: "VENTAS",
  }
);

module.exports = SalesModel;
