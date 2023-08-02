const OrderDetails = require("../../models/pixel/order_details.model.js");

const { Op } = require("sequelize");
require("dotenv").config();

const getAllOrders = async (req, res) => {
  try {
    const { business_id, branch_id, transact_id } = req.params;
    const orders = await OrderDetails.findAll({
      where: {
        id_negocio: business_id,
        id_sucursal: branch_id,
        transact: transact_id,
        precio: {
          [Op.ne]: 0
        },
      },
    });
    res.json(orders);
  } catch (error) {
    res.json({ message: error.message });
  }
};

module.exports = { getAllOrders };
