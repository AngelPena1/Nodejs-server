const db = require("../../database/db_pixel.js");
const { DataTypes } = require("sequelize");

const SalesCategoriesModel = db.define(
  "venta_categorias_group",
  {
    id_negocio: { type: DataTypes.INTEGER },
    id_sucursal: { type: DataTypes.INTEGER },
    opendate: { type: DataTypes.DATE },
    reportno: { type: DataTypes.INTEGER },
    descript1: { type: DataTypes.STRING },
    cantidad: { type: DataTypes.INTEGER },
    total: { type: DataTypes.INTEGER }
  },
  {
    timestamps: false,
    tableName: "venta_categorias_group",
  }
);

module.exports = SalesCategoriesModel;