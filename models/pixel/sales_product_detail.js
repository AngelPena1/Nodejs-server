const db = require("../../database/db_pixel.js");
const { DataTypes } = require("sequelize");

const SalesProductDetailModel = db.define(
  "venta_producto_detalle",
  {
    id_negocio: { type: DataTypes.INTEGER },
    id_sucursal: { type: DataTypes.INTEGER },
    opendate: { type: DataTypes.DATE },
    prodnum: { type: DataTypes.INTEGER },
    summarynum: { type: DataTypes.INTEGER },
    reportno: { type: DataTypes.INTEGER },
    descript: { type: DataTypes.STRING },
    descript1: { type: DataTypes.STRING },
    descript2: { type: DataTypes.STRING },
    cantidad: { type: DataTypes.DECIMAL },
    total: { type: DataTypes.DECIMAL },
  },
  {
    timestamps: false,
    tableName: "venta_producto_detalle",
  }
);

module.exports = SalesProductDetailModel;