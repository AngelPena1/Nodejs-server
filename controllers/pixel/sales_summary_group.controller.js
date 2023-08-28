const SalesSummaryGroupModel = require('../../models/pixel/sales_summary_group.model');
const { Op } = require('sequelize');
const sequelize = require('sequelize');
require("dotenv").config();

const getSalesSummaryGroup = async (req, res) => {
  try {
    const { business_id, branch_id, first_date, second_date} = req.params;

    const firstDate = () => {
      const date = new Date(first_date)
      const month = date.getMonth() + 1 > 9 ? `${date.getMonth() + 1}` : `0${date.getMonth() + 1}`
      const day = date.getDate() > 9 ? `${date.getDate()}` : `0${date.getDate()}`
      return `${date.getFullYear()}-${month}-${day}T00:00:00.000Z`
    }

    const secondDate = () => {
      const date = new Date(second_date)
      const month = date.getMonth() + 1 > 9 ? `${date.getMonth() + 1}` : `0${date.getMonth() + 1}`
      const day = date.getDate() > 9 ? `${date.getDate()}` : `0${date.getDate()}`
      return `${date.getFullYear()}-${month}-${day}T00:00:00.000Z`
    }
    
    const summary = await SalesSummaryGroupModel.findAll({
      attributes: ["descript1", [sequelize.fn("SUM", sequelize.col("cantidad")), "cantidad"], [sequelize.fn("SUM", sequelize.col("total")), "total"]],
      where: {
        ID_NEGOCIO: business_id,
        ID_SUCURSAL: branch_id,
        opendate: {
          [Op.between]: [firstDate(), secondDate()]
        },
      },
      group: ["descript1"]
    });
    res.json(summary);
  } catch (error) {
    res.json({ message: error.message });
  }
};

module.exports = { getSalesSummaryGroup };
