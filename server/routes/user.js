const express = require("express");
const router = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const db = require("../config/db");
const token = require("../config/jwt");

router.use(bodyParser.json());
router.use(cookieParser());
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
  const authHeader = req.headers["authorization"];
  const accessToken = authHeader && authHeader.split(" ")[1];

  if (accessToken) {
    const auth = token().check(accessToken, "access");
    console.log(auth);
  } else {
    const refreshToken = authHeader;
    console.log(cookieParser.JSONCookies(req.headers.cookie));
  }

  res.send("hi");
});

module.exports = router;
