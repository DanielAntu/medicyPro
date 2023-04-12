const express = require("express");
const router = express.Router();

router.use("/api/users", require("./UserRoutes"));
router.use("/api/revenue", require("./RevenueRouter"));

module.exports = router;
