const db = require("../../database/db_pixel.js");
const { DataTypes } = require("sequelize");
const DiscountModel = require('./discount.model.js')

const TransactionModel = db.define(
  "transacciones",
  {
    id_negocio: { type: DataTypes.INTEGER },
    id_sucursal: { type: DataTypes.INTEGER },
    opendate: { type: DataTypes.DATE },
    timestart: { type: DataTypes.DATE },
    timeend: { type: DataTypes.DATE },
    transact: { type: DataTypes.INTEGER },
    tablenum: { type: DataTypes.INTEGER },
    whostart: { type: DataTypes.INTEGER },
    empname1: { type: DataTypes.STRING },
    whoclose: { type: DataTypes.INTEGER },
    empname2: { type: DataTypes.STRING },
    nettotal: { type: DataTypes.DECIMAL },
    tax1: { type: DataTypes.DECIMAL },
    tax5: { type: DataTypes.DECIMAL },
    total: { type: DataTypes.DECIMAL }
  },
  {
    timestamps: false,
    tableName: "transacciones",
  }
);
// TransactionModel.belongsTo(DiscountModel, { foreignKey: 'transact' });
// DiscountModel.belongsTo(TransactionModel, { foreignKey: 'transact' });

TransactionModel.belongsTo(DiscountModel, {
  foreignKey: 'transact' 
});


module.exports = TransactionModel;