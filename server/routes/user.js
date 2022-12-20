const express = require("express");
const router = express();
const bodyParser = require("body-parser");
const db = require("../config/db");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.post("/login", (req, res) => {
  const { id, password } = req.body;

  db.query(
    `SELECT idx, name FROM member WHERE id='${id}' AND pw='${password}'`,
    (err, data) => {
      if (data.length === 0) {
        res.status(500).send("일치하는 회원 정보가 없습니다.");
      } else if (data.length !== 0) {
        res.send(data[0]);
      }
    }
  );
});

module.exports = router;
