const express = require("express");
const apis = express();

apis.use("/user", require("./user.js"));
apis.use("/auth", require("./auth.js"));
apis.use("/board", require("./board.js"));

module.exports = apis;
