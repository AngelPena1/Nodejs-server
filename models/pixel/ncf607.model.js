const db = require("../../database/db_pixel.js");
const { DataTypes } = require("sequelize");

const Ncf607Model = db.define(
  "ncf_607",
  {
    id_negocio: { type: DataTypes.INTEGER },
    id_sucursal: { type: DataTypes.INTEGER },
    rnc: { type: DataTypes.STRING },
    tipo: { type: DataTypes.INTEGER },
    ncf: { type: DataTypes.STRING },
    ncfref: { type: DataTypes.STRING },
    opendate: { type: DataTypes.DATE },
    nettotal: { type: DataTypes.DECIMAL },
    tax1: { type: DataTypes.DECIMAL },
    tax5: { type: DataTypes.DECIMAL },
    efectivo: { type: DataTypes.DECIMAL },
    tarjeta: { type: DataTypes.DECIMAL },
    credito: { type: DataTypes.DECIMAL },
    cheque: { type: DataTypes.DECIMAL },
    finaltotal: { type: DataTypes.DECIMAL },
    fiscalname: { type: DataTypes.STRING },
    transact: { type: DataTypes.INTEGER },
  },
  {
    timestamps: false,
    tableName: "ncf_607",
  }
);

module.exports = Ncf607Model;
