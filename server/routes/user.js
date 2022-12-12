const express = require("express");
const router = express();
const bodyParser = require("body-parser");
const db = require("../config/db");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

router.post("/login", (req, res) => {
    const {id, password} = req.body;

    db.query(`SELECT idx, name FROM member WHERE id='${id}' AND pw='${password}'`, (err, data) => {
      res.send(data);
    });
});
  
module.exports = router;