const SalesCategoriesModel = require('../../models/pixel/sales_categories.model');
const { Op } = require('sequelize');
require("dotenv").config();

const getSalesCategories = async (req, res) => {
  try {
    const { business_id, branch_id, first_date, second_date} = req.params;
    const salesCategories = await SalesCategoriesModel.findAll({
      where: {
        ID_NEGOCIO: business_id,
        ID_SUCURSAL: branch_id,
        opendate: {
            [Op.between]: [new Date(first_date), new Date(second_date)]
        }
      },
      order: [
        ['OPENDATE', 'ASC']
      ]
    });
    res.json(salesCategories);
  } catch (error) {
    res.json({ message: error.message });
  }
};

module.exports = { getSalesCategories };
