const express = require("express");
const apis = express();
const bodyParser = require("body-parser");
const db = require("../config/db");
const token = require("../config/jwt");

apis.use(bodyParser.json());
apis.use(bodyParser.urlencoded({ extended: true }));

//g 로그인
apis.post("/login", (req, res) => {
  const { id, password } = req.body;

  //TODO 아이디, 비밀번호 별도 검증
  db.query(
    `SELECT idx, id, name, phone, email 
    FROM member 
    WHERE id='${id}' 
    AND pw='${password}'`,
    (err, data) => {
      if (err)
        return res.status(500).json({ msg: "회원정보를 불러오지 못했습니다." });

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
apis.get("/:id", (req, res) => {
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

//! TEST
apis.post("/test", (req, res) => {
  // console.log(req.headers.cookie);
  res.send("TEST");
});

module.exports = apis;
