const Ncf607Model = require("../../models/pixel/ncf607.model.js");
require("dotenv").config();

const getAllNcf607ByBusinessAndBranch = async (req, res) => {
  try {
    const { business_id, branch_id } = req.params;
    console.log(business_id, branch_id);
    const ncf607 = await Ncf607Model.findAll({
        id_negocio: business_id,
        id_sucursal: branch_id
    });
    res.json(ncf607);
  } catch (error) {
    res.json({ message: error.message });
  }
};

module.exports = { getAllNcf607ByBusinessAndBranch };
