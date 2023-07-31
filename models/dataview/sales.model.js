const SalesTrackingModel = require('./sales_tracking.model.js')
const db = require("../../database/db_dataview.js");
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

SalesModel.hasOne(SalesTrackingModel, {
  foreignKey: { name: 'ID_NEGOCIO', allowNull: false },
  sourceKey: 'ID_NEGOCIO',
});

SalesModel.hasOne(SalesTrackingModel, {
  foreignKey: { name: 'ID_SUCURSAL', allowNull: false },
  sourceKey: 'ID_SUCURSAL',
});

SalesTrackingModel.belongsTo(SalesModel, {
  foreignKey: { name: 'ID_NEGOCIO', allowNull: false },
  targetKey: 'ID_NEGOCIO',
});

SalesTrackingModel.belongsTo(SalesModel, {
  foreignKey: { name: 'ID_SUCURSAL', allowNull: false },
  targetKey: 'ID_SUCURSAL',
});

module.exports = SalesModel;
