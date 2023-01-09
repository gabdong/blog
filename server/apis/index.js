const express = require("express");
const apis = express();

apis.use("/users", require("./users.js"));
apis.use("/tokens", require("./tokens.js"));
apis.use("/boards", require("./boards.js"));

module.exports = apis;
