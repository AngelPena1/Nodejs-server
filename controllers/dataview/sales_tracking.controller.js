const SalesModel = require("../../models/dataview/sales_tracking.model.js");
require("dotenv").config();

const getBusinessSalesTracking = async (req, res) => {
  try {
    const { businessid, limit, sucursalid } = req.params;
    const sales = await SalesModel.findAll({
      where: {
        ID_NEGOCIO: businessid,
        ID_SUCURSAL: sucursalid
      },
      limit: parseInt(limit),
      order: [
        ['FECHA', 'DESC']
      ]
    });
    res.json(sales);
  } catch (error) {
    res.json({ message: error.message });
  }
};

module.exports = { getBusinessSalesTracking };
