const router = require("express").Router();
const {
  getAllBusiness,
} = require("../../../controllers/pixel/business.controller.js");
const {
  getAllTransactions,
  getByTransactId,
  getTransactionByEmployee
} = require("../../../controllers/pixel/transactions.controller.js");
const {
  getBusinessPayments,
  getBusinessSalesDetails
} = require("../../../controllers/pixel/sales.controller.js");
const {
  getAllOrders,
} = require("../../../controllers/pixel/order_details.controller.js");
const {
  getBranchsByBusinessId,
} = require("../../../controllers/pixel/branch.controller.js");

router.get("/getall", getAllBusiness);
router.get("/:business_id/payment/branch/:branch_id/limit/:limit", getBusinessPayments);
router.get("/:business_id/sales/branch/:branch_id/limit/:limit", getBusinessSalesDetails);
router.get("/:business_id/branch/:branch_id/orders/transact/:transact_id", getAllOrders);
router.get("/:business_id/transactions/branch/:branch_id/limit/:limit", getAllTransactions);
router.get("/:business_id/transactions/branch/:branch_id/transact/:transact_id", getByTransactId);
router.get("/:business_id/transactions/branch/:branch_id/employee/:employee", getTransactionByEmployee);
router.get("/:business_id/get/branches", getBranchsByBusinessId);

module.exports = router;
