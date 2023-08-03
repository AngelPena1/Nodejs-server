const OrderDetails = require("../../models/pixel/order_details.model.js");
const DiscountModel = require("../../models/pixel/discount.model.js")
const PaymentsModel = require("../../models/pixel/payment.model.js")

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
        }
      },
    });

    const discounts = await DiscountModel.findAll({
      where: {
        transact: transact_id
      }
    })

    const payment_methods = await PaymentsModel.findAll({
      where: {
        transact: transact_id
      },
      attributes: ["descript", "tender", "cambio"]
    })
    res.json({orders, discounts, payment_methods});
  } catch (error) {
    res.json({ message: error.message });
  }
};

module.exports = { getAllOrders };
