const express = require("express");
const router = express();
const db = require("../config/db");

router.get("/test", (req, res) => {
  db.query("SELECT * FROM member", (err, data) => {
    res.send(data);
  });
});

module.exports = router;
