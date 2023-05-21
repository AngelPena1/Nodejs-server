const SalesTrackingModel = require("../../models/dataview/sales_tracking.model.js");
const SalesModel = require("../../models/dataview/sales.model.js");
const Sequelize = require("sequelize");
require("dotenv").config();

const getBusinessSalesTracking = async (req, res) => {
  try {
    const { businessid, limit, sucursalid } = req.params;
    const sales = await SalesTrackingModel.findAll({
      where: {
        ID_NEGOCIO: businessid,
        ID_SUCURSAL: sucursalid,
      },
      limit: parseInt(limit),
      order: [["FECHA", "DESC"]],
    });
    res.json(sales);
  } catch (error) {
    res.json({ message: error.message });
  }
};

const getBusinessSalesTrackingAndNetSale = async (req, res) => {
  try {
    const { businessid, limit, sucursalid } = req.params;
    const salesTracking = await SalesTrackingModel.findAll({
      where: {
        ID_NEGOCIO: businessid,
        ID_SUCURSAL: sucursalid,
      },
      limit: parseInt(limit),
      order: [["FECHA", "DESC"]],
    });

    const sales = await SalesModel.findAll({
      where: {
        ID_NEGOCIO: businessid,
        ID_SUCURSAL: sucursalid,
      },
      limit: parseInt(limit),
      order: [["FECHA", "DESC"]],
    });

    let newSales = [];

    salesTracking.forEach((saleTracking) => {
      sales.forEach((sale) => {
        if (!(formatDate(saleTracking.FECHA) === sale.FECHA)) return
        newSales.push({
          ID_NEGOCIO: saleTracking.ID_NEGOCIO,
          ID_SUCURSAL: saleTracking.ID_SUCURSAL,
          FECHA: formatDate(saleTracking.FECHA),
          NET_SLS_TTL: sale.NET_SLS_TTL,
          itbis: saleTracking.itbis,
          servicio: saleTracking.servicio,
          efectivo: saleTracking.efectivo,
          tarjetas: saleTracking.tarjetas,
          otrospagos: saleTracking.otrospagos,
        })
      });
    });

    res.json(newSales);
  } catch (error) {
    res.json({ message: error.message });
  }
};

function formatDate(date) {
  const cleanDate = new Date(date.toString().replace("T00:00:00.000Z", ""));
  const day = cleanDate.getDate() + 1;
  const month =
    cleanDate.getMonth() + 1 < 10
      ? `0${cleanDate.getMonth() + 1}`
      : cleanDate.getMonth() + 1;
  const year = cleanDate.getFullYear();
  const newFormatDate = `${year}-${month}-${day}`;
  return newFormatDate;
}

module.exports = {
  getBusinessSalesTracking,
  getBusinessSalesTrackingAndNetSale,
};
