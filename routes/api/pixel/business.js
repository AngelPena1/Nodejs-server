const router = require("express").Router();
const {
  getAllBusiness,
} = require("../../../controllers/pixel/business.controller.js");
const {
  getBusinessSales,
} = require("../../../controllers/pixel/sales.controller.js");

router.get("/getall", getAllBusiness);
router.get("/sales/:businessid/:limit", getBusinessSales);

module.exports = router;
