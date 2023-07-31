const PaymentsModel = require("../../models/pixel/payment.model.js");
const SalesDetailsModel = require("../../models/pixel/sales_details.model.js");
require("dotenv").config();

const getBusinessPayments = async (req, res) => {
  try {
    const { business_id, branch_id, limit } = req.params;
    const sales = await PaymentsModel.findAll({
      where: {
        ID_NEGOCIO: business_id,
        ID_SUCURSAL: branch_id
      },
      limit: parseInt(limit),
      order: [
        ['OPENDATE', 'DESC']
      ]
    });
    res.json(sales);
  } catch (error) {
    res.json({ message: error.message });
  }
};

const getBusinessSalesDetails = async (req, res) => {
  try {
    const { business_id, branch_id, limit } = req.params;
    const sales = await SalesDetailsModel.findAll({
      where: {
        ID_NEGOCIO: business_id,
        ID_SUCURSAL: branch_id
      },
      limit: parseInt(limit),
      order: [
        ['cantidad', 'DESC']
      ],
      group: ['descript1'] 
    });
    res.json(sales);
  } catch (error) {
    res.json({ message: error.message });
  }
};

module.exports = { getBusinessPayments, getBusinessSalesDetails };
