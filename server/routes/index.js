const express = require("express");
const router = express();

router.use("/user", require("./user.js"));

module.exports = router;
