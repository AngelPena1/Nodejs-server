const db = require("../../database/db_pixel.js");
const { DataTypes } = require("sequelize");

const PaymentsModel = db.define(
  "pagos",
  {
    ID_NEGOCIO: { type: DataTypes.INTEGER },
    ID_SUCURSAL: { type: DataTypes.INTEGER },
    OPENDATE: { type: DataTypes.DATE },
    EMPNAME: { type: DataTypes.INTEGER },
    DESCRIPT: { type: DataTypes.STRING },
    TENDER: { type: DataTypes.DECIMAL },
    CAMBIO: { type: DataTypes.DECIMAL },
  },
  {
    timestamps: false,
    tableName: "pagos",
  }
);

module.exports = PaymentsModel;