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

  db.query(
    `SELECT idx, id, name, phone, email 
    FROM member 
    WHERE id='${id}' 
    AND pw='${password}'`,
    (err, data) => {
      if (err) return res.status(500).json({ msg: '회원정보를 불러오지 못했습니다. (ERR_CODE: 01)' });

      if (data.length === 0) {
        res.status(404).json({ msg: "일치하는 회원 정보가 없습니다. (ERR_CODE: 02)" });
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
//TODO 지워도될지 확인
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
apis.post('/test', (req, res) => {
  // console.log(req.headers.cookie);
  // console.log(req);
  res.send('success');
});

module.exports = apis;
