const TransactionModel = require("../../models/pixel/transactions.model.js");
const DiscountModel = require("../../models/pixel/discount.model.js");
const { Op } = require('sequelize'); 
require("dotenv").config();

const getAllTransactions = async (req, res) => {
  try {
    const { business_id, branch_id, limit } = req.params;
    const transactions = await TransactionModel.findAll({
      where: {
        ID_NEGOCIO: business_id,
        ID_SUCURSAL: branch_id,
      },
      limit: parseInt(limit),
      order: [["transact", "DESC"]],
      include: [
        {
          model: DiscountModel,
          attributes: ["monto"],
        },
      ],
    });
    res.json(transactions);
  } catch (error) {
    res.json({ message: error.message });
  }
};

const getByTransactId = async (req, res) => {
  try {
    const { business_id, branch_id, transact_id } = req.params;
    const transaction = await TransactionModel.findAll({
      where: {
        ID_NEGOCIO: business_id,
        ID_SUCURSAL: branch_id,
        transact: transact_id,
      },
      include: [
        {
          model: DiscountModel,
          attributes: ["monto"],
        },
      ],
    });
    res.json(transaction);
  } catch (error) {
    res.json({ message: error.message });
  }
};

const getTransactionByEmployee = async (req, res) => {
  try {
    const { business_id, branch_id, employee } =
      req.params;

    const transaction = await TransactionModel.findAll({
      where: {
        ID_NEGOCIO: business_id,
        ID_SUCURSAL: branch_id,
        [Op.or]: [
          { empname1: employee },
          { empname2: employee },
        ]
      },
      include: [
        {
          model: DiscountModel,
          attributes: ["monto"],
        },
      ],
    });
    res.json(transaction);
  } catch (error) {
    res.json({ message: error.message });
  }
};

module.exports = { getAllTransactions, getByTransactId, getTransactionByEmployee };
