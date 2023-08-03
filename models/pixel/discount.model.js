const db = require("../../database/db_pixel.js");
const { DataTypes } = require("sequelize");

const DiscountModel = db.define(
  "descuentos",
  {
    id_negocio: { type: DataTypes.INTEGER },
    id_sucursal: { type: DataTypes.INTEGER },
    opendate: { type: DataTypes.DATE },
    transact: { type: DataTypes.INTEGER},
    descript: { type: DataTypes.STRING},
    monto: { type: DataTypes.DECIMAL},
  },
  {
    timestamps: false,
    tableName: "descuentos",
  }
);

// DiscountModel.belongsTo(TransactionModel, { foreignKey: 'transact' });

module.exports = DiscountModel;