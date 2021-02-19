const { check, validationResult } = require('express-validator');
const { StatusCodes } = require('http-status-codes');

function validateRegister() {
    return [check('username').exists().withMessage('Username field is required').not().isEmpty().withMessage('Username should not be empty'),
    check('password').exists().withMessage('Password field is required').not().isEmpty().withMessage('Password should not be empty'),
    check('email').exists().withMessage('Email field is required').not().isEmpty().withMessage('Email should not be empty').isEmail().withMessage('Email must be a valid email')];
}

function validateLogin() {
    return [check('username').exists().withMessage('Username field is required').not().isEmpty().withMessage('Username should not be empty'),
    check('password').exists().withMessage('Password field is required').not().isEmpty().withMessage('Password should not be empty')];
}

function handleErrors() {
    return (req, res, next) => {
        const errors = validationResult(req);
        if (errors.array().length > 0) {
            res.status(StatusCodes.CONFLICT).json(errors.array());
        } else {
            next();
        }
    }
}

module.exports.validateRegister = validateRegister;
module.exports.validateLogin = validateLogin;
module.exports.handleErrors = handleErrors;