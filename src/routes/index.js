const Router = require('express');
const userRoutes = require('./user')

const routes = Router();

module.exports = routes;

routes.use('/user', userRoutes)