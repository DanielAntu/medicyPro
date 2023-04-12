const { body } = require("express-validator");

const createRevenueValidation = () => {
    return [
        body("weight").isString().withMessage("O peso é obrigatório."),
        body("age").isString().withMessage("A idade é obrigatória."),
        body("drops").isString().withMessage("A dose é obrigatória"),
    ];
};

module.exports = {
    createRevenueValidation,
};
