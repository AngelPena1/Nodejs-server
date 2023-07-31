const TransactionModel = require("../../models/pixel/transactions.model.js");
require("dotenv").config();

const getAllTransactions = async (req, res) => {
  try {
    const { business_id, branch_id, limit } = req.params;
    const transactions = await TransactionModel.findAll({
      where: {
        ID_NEGOCIO: business_id,
        ID_SUCURSAL: branch_id
      },
      limit: parseInt(limit),
      order: [
        ['OPENDATE', 'DESC']
      ]
    });
    res.json(transactions);
  } catch (error) {
    res.json({ message: error.message });
  }
};


module.exports = { getAllTransactions };