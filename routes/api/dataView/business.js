const router = require("express").Router();
const {
  getAllBusiness,
} = require("../../../controllers/dataview/business.controller.js");
const {
  getBusinessSales,
} = require("../../../controllers/dataview/sales.controller.js");
const {
  getBusinessSalesTracking,
} = require("../../../controllers/dataview/sales_tracking.controller.js");

router.get("/getall", getAllBusiness);
router.get("/sales/:businessid/:limit", getBusinessSales);
router.get("/sales/tracking/:businessid/:sucursalid/:limit", getBusinessSalesTracking);

module.exports = router;
