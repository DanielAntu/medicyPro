const { body } = require("express-validator");

const userRegisterValidation = () => {
    return [
        body("name")
            .isString()
            .withMessage("O nome é obrigatório.")
            .isLength({ min: 3 })
            .withMessage("O nome deve conter no minimo 3 caracteres"),
        body("email")
            .isString()
            .withMessage("O e-mail é obrigatório.")
            .isEmail()
            .withMessage("O e-mail precisa ser válido"),
        body("password")
            .isString()
            .withMessage("A senha é obrigatória.")
            .isLength({ min: 5 })
            .withMessage("A senha deve ter no minimo 5 caracteres"),
        body("confirmPassword")
            .isString()
            .withMessage("A confirmação de senha é obrigatória")
            .custom((value, { req }) => {
                if (value != req.body.password) {
                    throw new Error("As senhas não são iguais.");
                }
                return true;
            }),
    ];
};

const loginValidation = () => {
    return [
        body("email")
            .isString()
            .withMessage("O e-mail é obrigatório.")
            .isEmail()
            .withMessage("O e-mail precisa ser valido."),
        body("password")
            .isString()
            .withMessage("A senha é obrigatória")
            .isLength({ min: 5 })
            .withMessage("A senha deve conter no mínimo 5 caracteres"),
    ];
};

const updateValidation = () => {
    return [
        body("name")
            .optional()
            .isString()
            .withMessage("O nome é obrigatório.")
            .isLength({ min: 3 })
            .withMessage("O nome precisa de no minimo 3 caracteres"),
        body("password")
            .optional()
            .isString()
            .withMessage("A senha é obrigatória")
            .isLength({ min: 5 })
            .withMessage("A senha precisa ter no minimo 5 caracteres."),
    ];
};

module.exports = {
    userRegisterValidation,
    loginValidation,
    updateValidation,
};
