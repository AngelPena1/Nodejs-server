const db = require("../../database/db_pixel.js");
const { DataTypes } = require("sequelize");

const PaymentsModel = db.define(
  "pagos",
  {
    id_negocio: { type: DataTypes.INTEGER },
    id_sucursal: { type: DataTypes.INTEGER },
    opendate: { type: DataTypes.DATE },
    empname: { type: DataTypes.INTEGER },
    descript: { type: DataTypes.STRING },
    tender: { type: DataTypes.DECIMAL },
    cambio: { type: DataTypes.DECIMAL },
  },
  {
    timestamps: false,
    tableName: "pagos",
  }
);

module.exports = PaymentsModel;