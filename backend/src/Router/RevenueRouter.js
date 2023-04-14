const express = require("express");
const router = express.Router();

// middlewares
const authGuard = require("../middlewares/authGuard");
const validate = require("../middlewares/handleValidation");
const {
    createRevenueValidation,
    updateRevenueValidations,
} = require("../middlewares/RevenueValidation");

// controllers
const {
    createRevenue,
    getUserRevenue,
    getRevenueById,
    deleteRevenue,
    updateRevenue,
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
router.put(
    "/:id",
    authGuard,
    updateRevenueValidations(),
    validate,
    updateRevenue
);

module.exports = router;
