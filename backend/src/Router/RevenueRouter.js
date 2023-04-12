const express = require("express");
const router = express.Router();

// middlewares
const authGuard = require("../middlewares/authGuard");
const validate = require("../middlewares/handleValidation");
const { createRevenueValidation } = require("../middlewares/RevenueValidation");

// controllers
const {
    createRevenue,
    getUserRevenue,
    getRevenueById,
    deleteRevenue,
} = require("../controllers/RevenueController");

router.post(
    "/create",
    authGuard,
    createRevenueValidation(),
    validate,
    createRevenue
);
router.get("/", authGuard, getUserRevenue);
router.get("/:id", authGuard, getRevenueById);
router.delete("/:id", authGuard, deleteRevenue);

module.exports = router;
