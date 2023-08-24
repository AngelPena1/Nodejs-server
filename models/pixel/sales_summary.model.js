const db = require("../../database/db_pixel.js");
const { DataTypes } = require("sequelize");

const SalesSummary = db.define(
  "ventas_resumen",
  {
    id_negocio: { type: DataTypes.INTEGER },
    id_sucursal: { type: DataTypes.INTEGER },
    opendate: { type: DataTypes.DATE },
    numcust: { type: DataTypes.INTEGER },
    trans: { type: DataTypes.INTEGER },
    nettotal: { type: DataTypes.DECIMAL },
    tax1: { type: DataTypes.DECIMAL },
    tax5: { type: DataTypes.DECIMAL },
    total: { type: DataTypes.DECIMAL },
    descuentos: { type: DataTypes.DECIMAL },
    anulaciones: { type: DataTypes.DECIMAL },
    ventasbiertas: { type: DataTypes.INTEGER },
    transabiertas: { type: DataTypes.INTEGER },
    numcust2: { type: DataTypes.INTEGER },
  },
  {
    timestamps: false,
    tableName: "ventas_resumen",
  }
);

module.exports = SalesSummary;