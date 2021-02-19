const Router = require('express');
const userController = require('../controllers/user');
const passport = require('passport');
const { authorizeRole } = require('../middleware/authorizeRole');
const utils = require('../lib/utils');
const { validateRegister, validateLogin, handleErrors } = require('../middleware/validation/user')

const userRouter = Router();

module.exports = userRouter;


userRouter
    .post("/login", validateLogin(), handleErrors(), userController.login)
    .post("/register", validateRegister(), handleErrors(), userController.register)
    .get("/profile", passport.authenticate('jwt', { session: false }), authorizeRole(utils.ROLE.ADMIN), userController.profile)

