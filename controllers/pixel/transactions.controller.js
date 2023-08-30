const TransactionModel = require("../../models/pixel/transactions.model.js");
const DiscountModel = require("../../models/pixel/discount.model.js");
const { Op } = require('sequelize'); 
const sequelize = require('sequelize');
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

const getTransactionPlaces = async (req, res) => {
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

    const transactions = await TransactionModel.findAll({
      attributes: ["descript1", [sequelize.fn("SUM", sequelize.col("total")), "total"]],
      where: {
        ID_NEGOCIO: business_id,
        ID_SUCURSAL: branch_id,
        opendate: {
          [Op.between]: [firstDate(), secondDate()]
        },
      },
      group: ["descript1"]
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

module.exports = { getAllTransactions, getTransactionPlaces, getByTransactId, getTransactionByEmployee };
