const express = require("express");
const bodyParser = require("body-parser");
const passport = require('passport');
let cors = require('cors');

const routes = require('./routes/index');
const { sequelize } = require("./models");

const app = express();

require('./security/passport')(passport);

app.use(bodyParser.urlencoded({ extended: false }))

app.use(passport.initialize());

app.use(bodyParser.json())

app.use(cors());
app.use(routes);

// sequelize.sync({ force: true });

module.exports = app;