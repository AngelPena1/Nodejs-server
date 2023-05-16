const BusinessModel = require("../../models/dataview/business.model.js");
require("dotenv").config();

const getAllBusiness = async (req, res) => {
  try {
    const users = await BusinessModel.findAll();
    res.json(users);
  } catch (error) {
    res.json({ message: error.message });
  }
};

module.exports = { getAllBusiness };
