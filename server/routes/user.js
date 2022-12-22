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
    `SELECT idx, id, name, phone, email FROM member WHERE id='${id}' AND pw='${password}'`,
    (err, data) => {
      if (err) return res.status(500).json({ msg: err });

      if (data.length === 0) {
        res.status(404).json({ msg: "일치하는 회원 정보가 없습니다." });
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

//g get user info
router.get("/:id", (req, res) => {
  const { id } = req.params;

  db.query(
    `SELECT idx, name, id, phone, email FROM member WHERE id='${id}'`,
    (err, data) => {
      if (err) return res.status(500).json({ msg: err });

      if (data.length === 0) {
        res.status(404).json({ msg: "회원 정보를 찾을 수 없습니다." });
      } else if (data.length !== 0) {
        const user = data[0];

        res.json({ user });
      }
    }
  );
});

//g refresh auth
router.post("/refreshAuth", (req, res) => {
  const authHeader = req.headers["authorization"];
  const accessToken = authHeader
    ? authHeader && authHeader.split(" ")[1]
    : null;
  const refreshToken = utils.getCookie(req.headers.cookie, "auth");
  const result = {};
  const auth = accessToken
    ? token().check(accessToken, "access") ||
      token().check(refreshToken, "refresh")
    : token().check(refreshToken, "refresh");
  const isAccessToken =
    accessToken && token().check(accessToken, "access") ? true : false;

  //g access, refresh 정보 없을경우
  if (!auth)
    return res.status(401).json({ msg: "로그인이 되어있지 않습니다." });

  const { id } = auth;
  if (!isAccessToken) {
    //g accessToken 갱신
    const newAccessToken = token().access(id);
    const newRefreshToken = token().refresh(id);

    res.cookie("auth", newRefreshToken, {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
    });
    result.accessToken = newAccessToken;
    result.auth = token().check(newAccessToken, "access");
  } else {
    result.auth = auth;
  }

  res.json(result);
});

router.delete("/auth", (req, res) => {
  res.cookie("auth", "", {
    httpOnly: true,
    maxAge: 0,
  });
  res.send("Logout");
});

module.exports = router;
