const BusinessModel = require("../../models/pixel/business.model.js");
require("dotenv").config();

const getAllBusiness = async (req, res) => {
  try {
    const business = await BusinessModel.findAll();
    res.json(business);
  } catch (error) {
    res.json({ message: error.message });
  }
};

module.exports = { getAllBusiness };
