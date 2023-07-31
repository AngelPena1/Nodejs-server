const router = require("express").Router();
const {
  getAllBusiness,
} = require("../../../controllers/pixel/business.controller.js");
const {
  getAllTransactions,
} = require("../../../controllers/pixel/transactions.controller.js");
const {
  getBusinessPayments,
  getBusinessSalesDetails
} = require("../../../controllers/pixel/sales.controller.js");

router.get("/getall", getAllBusiness);
router.get("/:business_id/payment/branch/:branch_id/limit/:limit", getBusinessPayments);
router.get("/:business_id/sales/branch/:branch_id/limit/:limit", getBusinessSalesDetails);
router.get("/:business_id/transactions/branch/:branch_id/limit/:limit", getAllTransactions);

module.exports = router;
