const router = require("express").Router();
const {
  getAllBusiness,
} = require("../../../controllers/pixel/business.controller.js");
const {
  getAllTransactions,
  getTransactionPlaces,
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
const {
  getAllNcf607ByBusinessAndBranch,
} = require("../../../controllers/pixel/ncf607.controller.js");
const {
  getSalesSummaryByBranch,
  getSalesSummaryByBusiness
} = require("../../../controllers/pixel/sales_summary.controller");
const {
  getSalesSummaryGroup
} = require("../../../controllers/pixel/sales_summary_group.controller");
const {
  getSalesCategories
} = require("../../../controllers/pixel/sales_categories.controller");
const {
  getPaymentsByBusiness
} = require("../../../controllers/pixel/payment.controller");

router.get("/getall", getAllBusiness);
router.get("/:business_id/payment/branch/:branch_id/limit/:limit", getBusinessPayments);
router.get("/:business_id/branch/:branch_id/sales/product/detail/firstdate/:first_date/seconddate/:second_date", getBusinessSalesDetails);
router.get("/:business_id/branch/:branch_id/orders/transact/:transact_id", getAllOrders);
router.get("/:business_id/transactions/branch/:branch_id/limit/:limit", getAllTransactions);
router.get("/:business_id/branch/:branch_id/transactions/summary/places/firstdate/:first_date/seconddate/:second_date", getTransactionPlaces);
router.get("/:business_id/transactions/branch/:branch_id/transact/:transact_id", getByTransactId);
router.get("/:business_id/transactions/branch/:branch_id/employee/:employee", getTransactionByEmployee);
router.get("/:business_id/get/branches", getBranchsByBusinessId);
router.get("/:business_id/branch/:branch_id/ncf/getall", getAllNcf607ByBusinessAndBranch);
router.get("/:business_id/branch/:branch_id/sales/summary/firstdate/:first_date/seconddate/:second_date", getSalesSummaryByBranch);
router.get("/:business_id/sales/summary/firstdate/:first_date/seconddate/:second_date", getSalesSummaryByBusiness);
router.get("/:business_id/branch/:branch_id/sales/categories/firstdate/:first_date/seconddate/:second_date", getSalesCategories);
router.get("/:business_id/branch/:branch_id/sales/summary/category/group/firstdate/:first_date/seconddate/:second_date", getSalesSummaryGroup);
router.get("/:business_id/branch/:branch_id/sales/summary/payments/firstdate/:first_date/seconddate/:second_date", getPaymentsByBusiness);

module.exports = router;
