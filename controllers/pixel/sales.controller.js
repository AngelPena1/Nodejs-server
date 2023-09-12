const PaymentsModel = require("../../models/pixel/payment.model.js");
const SalesProductDetailModel = require("../../models/pixel/sales_product_detail.js");
const { firstFormatDate, secondFormatDate } = require("../../utils/formatDate.js");
const sequelize = require("sequelize");
const { Op } = require("sequelize");
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
    const { business_id, branch_id, first_date, second_date } = req.params;
    const salesDetail = await SalesProductDetailModel.findAll({
      attributes: [
        ['descript1', 'category'],
        ['descript', 'product'],
        'prodnum',
        'summarynum',
        [sequelize.fn("SUM", sequelize.col("cantidad")), "cantidad"],
        [sequelize.fn("SUM", sequelize.col("total")), "total"]
      ],
      where: {
        ID_NEGOCIO: business_id,
        ID_SUCURSAL: branch_id,
        opendate: {
          [Op.between]: [
            firstFormatDate(first_date),
            secondFormatDate(second_date),
          ],
        },
      },
      order: [
        ['summarynum', 'Asc'],
        ['reportno', 'Asc'],
        ['total', 'Desc'],
        ['descript', 'Asc'],
      ],
      group: ['descript2', 'descript1', 'prodnum']
    });
    
    res.json(salesDetail);
  } catch (error) {
    res.json({ message: error.message });
  }
};

module.exports = { getBusinessPayments, getBusinessSalesDetails };
