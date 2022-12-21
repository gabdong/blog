const express = require("express");
const router = express();
const bodyParser = require("body-parser");
const db = require("../config/db");
const token = require("../config/jwt");
const utils = require("../utils/utils");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

//g 로그인
router.post("/login", (req, res) => {
  const { id, password } = req.body;

  db.query(
    `SELECT idx, name FROM member WHERE id='${id}' AND pw='${password}'`,
    (err, data) => {
      if (data.length === 0) {
        res.status(500).json({ error: "일치하는 회원 정보가 없습니다." });
      } else if (data.length !== 0) {
        const user = data[0];
        const { id } = user;
        const accessToken = token().access(id);
        const refreshToken = token().refresh(id);

        res.cookie("auth", refreshToken, {
          maxAge: 1000 * 60 * 60 * 24,
          httpOnly: true,
        });
        res.json({ user, accessToken });
      }
    }
  );
});

//g 권한조회
router.get("/auth", (req, res) => {
  const id = req.query.id;
  const authHeader = req.headers["authorization"];
  const accessToken = authHeader && authHeader.split(" ")[1];
  const refreshToken = utils.getCookie(req.headers.cookie, "auth");

  // if (accessToken) {
  if (true) {
    try {
      const auth = token().check(accessToken, "access");
    } catch (err) {
      try {
        const auth = token().check(refreshToken, "refresh");
      } catch (err) {}

      console.log(auth);
    }
  } else {
    const cookie = req.headers.cookie.split(";");
    const auth = token().check(refreshToken, "refresh");
    console.log(refreshToken);
  }

  res.send("hi");
});

module.exports = router;
