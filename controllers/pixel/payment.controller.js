const PaymentModel = require("../../models/pixel/payment.model.js");
const { firstFormatDate, secondFormatDate} = require("../../utils/formatDate.js");
const { Op } = require("sequelize");
const sequelize = require("sequelize");
require("dotenv").config();

const getPaymentsGroupByBusiness = async (req, res) => {
  try {
    const { business_id, branch_id, first_date, second_date } = req.params;

    const payments = await PaymentModel.findAll({
      attributes: [
        "descript",
        [sequelize.fn("SUM", sequelize.col("tender")), "tender"],
        [sequelize.fn("SUM", sequelize.col("cambio")), "cambio"],
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
      group: ["descript"],
      order: [["tender", "DESC"]]
    });
    res.json(payments);
  } catch (error) {
    res.json({ message: error.message });
  }
};

const getPaymentsByBusiness = async (req, res) => {
  try {
    const { business_id, branch_id, first_date, second_date } = req.params;

    const payments = await PaymentModel.findAll({
      where: {
        ID_NEGOCIO: business_id,
        ID_SUCURSAL: branch_id,
        opendate: {
          [Op.between]: [
            firstFormatDate(first_date),
            secondFormatDate(second_date),
          ],
        },
      }
    });
    res.json(payments);
  } catch (error) {
    res.json({ message: error.message });
  }
};

module.exports = { getPaymentsGroupByBusiness, getPaymentsByBusiness };
