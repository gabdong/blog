const express = require("express");
const router = express.Router();

router.use("/users", require("./users.js"));
router.use("/tokens", require("./tokens.js"));
router.use("/boards", require("./boards.js"));
router.use("/posts", require("./posts.js"));

module.exports = router;
