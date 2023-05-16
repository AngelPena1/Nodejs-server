const db = require("../../database/db.js");
const { DataTypes } = require("sequelize");

const BusinessModel = db.define(
  "NEGOCIOS",
  {
    ID_NEGOCIO: { 
        type: DataTypes.INTEGER,
        primaryKey: true
     },
    NOMBRE_NEGOCIO: { type: DataTypes.STRING },
    ACTIVO: { type: DataTypes.STRING },
  },
  {
    timestamps: false,
    tableName: "NEGOCIOS",
  }
);

module.exports = BusinessModel;
