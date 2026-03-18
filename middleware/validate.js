const {body, validationResult} = require('express-validator');

const contactValidationRules = () => {
    return [
        body("firstName").notEmpty().withMessage("First name is required.").trim(),
        body("lastName").notEmpty().withMessage("Last name is required.").trim(),

        body("email").isEmail().withMessage("Please provide a valid email address.").normalizeEmail(),

        body("favoriteColor").notEmpty().withMessage("Favorite color is required."),

        body("birthday").isDate({ format: 'MM-DD-YYYY' }).withMessage("Birthday must be a valid date (MM-DD-YYYY)")

    ];
};

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    
    const extractedErrors = [];
    errors.array().map(err => extractedErrors.push({[err.path]: err.msg}));

    return res.status(412).json({
        success: false,
        message: "Validation failed",
        data: extractedErrors,
    });
};

module.exports = {
    contactValidationRules,
    validate
};