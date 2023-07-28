const SalesModel = require("../../models/pixel/sales.model.js");
require("dotenv").config();

const getBusinessSales = async (req, res) => {
  try {
    const { businessid, limit } = req.params;
    const sales = await SalesModel.findAll({
      where: {
        ID_NEGOCIO: businessid
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

module.exports = { getBusinessSales };
