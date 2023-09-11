const SalesSummaryGroupModel = require("../../models/pixel/sales_summary_group.model");
const { firstFormatDate, secondFormatDate } = require("../../utils/formatDate.js");
const { Op } = require("sequelize");
const sequelize = require("sequelize");
require("dotenv").config();

const getSalesSummaryGroup = async (req, res) => {
  try {
    const { business_id, branch_id, first_date, second_date } = req.params;

    const summary = await SalesSummaryGroupModel.findAll({
      attributes: [
        "descript1",
        [sequelize.fn("SUM", sequelize.col("cantidad")), "cantidad"],
        [sequelize.fn("SUM", sequelize.col("total")), "total"],
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
      group: ["descript1"],
      order: [["total", "DESC"]]
    });
    res.json(summary);
  } catch (error) {
    res.json({ message: error.message });
  }
};

module.exports = { getSalesSummaryGroup };
