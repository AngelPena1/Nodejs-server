const SalesCategoriesModel = require("../../models/pixel/sales_categories.model");
const { firstFormatDate, secondFormatDate } = require("../../utils/formatDate.js");
const { Op } = require("sequelize");
const sequelize = require("sequelize");
require("dotenv").config();

const getSalesCategories = async (req, res) => {
  try {
    const { business_id, branch_id, first_date, second_date } = req.params;

    const salesCategories = await SalesCategoriesModel.findAll({
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
    res.json(salesCategories);
  } catch (error) {
    res.json({ message: error.message });
  }
};

module.exports = { getSalesCategories };
