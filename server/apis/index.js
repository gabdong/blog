const express = require("express");
const apis = express();

apis.use("/user", require("./user.js"));
apis.use('/auth', require('./auth.js'));

module.exports = apis;
