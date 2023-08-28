const db = require("../../database/db_pixel.js");
const { DataTypes } = require("sequelize");

const SalesSummaryGroupModel = db.define(
  "venta_summary_group",
  {
    id_negocio: { type: DataTypes.INTEGER },
    id_sucursal: { type: DataTypes.INTEGER },
    opendate: { type: DataTypes.DATE },
    summarynum: { type: DataTypes.INTEGER },
    descript1: { type: DataTypes.STRING },
    cantidad: { type: DataTypes.DECIMAL },
    total: { type: DataTypes.DECIMAL }
  },
  {
    timestamps: false,
    tableName: "venta_summary_group",
  }
);

module.exports = SalesSummaryGroupModel;