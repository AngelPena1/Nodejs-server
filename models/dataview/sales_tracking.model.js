const db = require("../../database/db.js");
const { DataTypes } = require("sequelize");

const SalesTrackingModel = db.define(
  "VENTAS_TRACKING",
  {
    ID_NEGOCIO: { type: DataTypes.INTEGER },
    ID_SUCURSAL: { type: DataTypes.INTEGER },
    FECHA: { type: DataTypes.STRING },
    itbis: { type: DataTypes.DOUBLE },
    servicio: { type: DataTypes.DOUBLE },
    efectivo: { type: DataTypes.DOUBLE },
    tarjetas: { type: DataTypes.DOUBLE },
    otrospagos: { type: DataTypes.DOUBLE }
  },
  {
    timestamps: false,
    tableName: "VENTAS_TRACKING",
  }
);

module.exports = SalesTrackingModel;
