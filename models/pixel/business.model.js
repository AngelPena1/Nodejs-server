const db = require("../../database/db_pixel.js");
const { DataTypes } = require("sequelize");

const BusinessModel = db.define(
  "negocios",
  {
    ID_NEGOCIO: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    NOMBRE_NEGOCIO: { type: DataTypes.STRING },
    ACTIVO: { type: DataTypes.STRING },
    CODIGOMULTINEGOCIO: { type: DataTypes.INTEGER },
  },
  {
    timestamps: false,
    tableName: "negocios",
  }
);

module.exports = BusinessModel;
