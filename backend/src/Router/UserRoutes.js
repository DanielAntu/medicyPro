const express = require("express");
const router = express.Router();

// controllers
const {
    register,
    login,
    userCurrent,
    getUserById,
    updateUser,
} = require("../controllers/UserController");

// middlewares
const validate = require("../middlewares/handleValidation");
const {
    userRegisterValidation,
    loginValidation,
    updateValidation,
} = require("../middlewares/userValidation");
const authGuard = require("../middlewares/authGuard");

router.post("/register", userRegisterValidation(), validate, register);
router.post("/login", loginValidation(), validate, login);
router.get("/profile", authGuard, userCurrent);
router.get("/:id", getUserById);
router.put("/update", authGuard, updateValidation(), validate, updateUser);

module.exports = router;
