const BranchModel = require("../../models/pixel/branch.model.js");
require("dotenv").config();

const getBranchsByBusinessId = async (req, res) => {
  try {
    const branches = await BranchModel.findAll({
      where: {
        ID_NEGOCIO: req.params.business_id,
      },
    });
    res.json(branches);
  } catch (error) {
    res.json({ message: error.message });
  }
};

module.exports = { getBranchsByBusinessId };
