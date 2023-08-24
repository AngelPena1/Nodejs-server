const SalesSummary = require('../../models/pixel/sales_summary.model');
const { Op } = require('sequelize');
require("dotenv").config();

const getSalesSummary = async (req, res) => {
  try {
    const { business_id, branch_id, first_date, second_date} = req.params;
    const summary = await SalesSummary.findAll({
      where: {
        ID_NEGOCIO: business_id,
        ID_SUCURSAL: branch_id,
        opendate: {
            [Op.between]: [new Date(first_date), new Date(second_date)]
        }
      },
      order: [
        ['OPENDATE', 'DESC']
      ]
    });
    res.json(summary);
  } catch (error) {
    res.json({ message: error.message });
  }
};

module.exports = { getSalesSummary };
