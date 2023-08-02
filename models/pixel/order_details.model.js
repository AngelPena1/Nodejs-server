const db = require("../../database/db_pixel.js");
const { DataTypes } = require("sequelize");

const OrderDetails = db.define(
  "detalle_orden",
  {
    id_negocio: { type: DataTypes.INTEGER },
    id_sucursal: { type: DataTypes.INTEGER },
    opendate: { type: DataTypes.DATE },
    transact: { type: DataTypes.INTEGER },
    prodnum: { type: DataTypes.INTEGER },
    descript: { type: DataTypes.STRING },
    cantidad: { type: DataTypes.INTEGER },
    precio: { type: DataTypes.DECIMAL },
    timeord: { type: DataTypes.DATE },
    recpos: { type: DataTypes.INTEGER },
  },
  {
    timestamps: false,
    tableName: "detalle_orden",
  }
);

module.exports = OrderDetails;