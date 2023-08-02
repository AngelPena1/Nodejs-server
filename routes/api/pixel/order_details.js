const router = require("express").Router();
const {
  getAllOrders,
} = require("../../../controllers/pixel/order_details.controller.js");

router.get("/:business_id/branch/:branch_id/transact/:transact_id", getAllOrders);

module.exports = router;
