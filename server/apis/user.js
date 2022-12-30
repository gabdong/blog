require("dotenv").config();
const express = require("express");
const apis = express();
const bodyParser = require("body-parser");
const db = require("../config/db");
const token = require("../config/jwt");
const md5 = require('md5');

apis.use(bodyParser.json());
apis.use(bodyParser.urlencoded({ extended: true }));

//g 로그인
apis.post("/login", (req, res) => {
  const { id, password } = req.body;

  //g 로그인 정보 확인
  db.query(
    `SELECT idx, id, name, phone, email 
    FROM member 
    WHERE id='${id}' 
    AND pw='${password}'`,
    (err, data) => {
      if (err)
        return res.status(500).json({ msg: "회원정보를 불러오지 못했습니다." });

      const isLogin = data.length === 0 ? false : true;

      if (!isLogin) {
        res.status(404).json({ msg: "아이디 또는 비밀번호를 잘못 입력했습니다. 입력하신 내용을 다시 확인해주세요." });
      } else if (isLogin) {
        const user = data[0];
        const { id } = user;

        //g Token 발행
        const accessToken = token().access(id);
        const refreshToken = token().refresh(id);

        //g refreshToken 저장
        db.query(
          `INSERT INTO auth SET 
          refreshToken='${refreshToken}'`, 
          (err, data) => {
            if (err) 
              return res.status(500).json({ msg: "인증정보 저장을 실패하였습니다." });

            const {insertId} = data;
            const hashIdx = md5(`${process.env.REFRESH_TOKEN_HASH_IDX_KEY}${insertId}`);

            db.query(
              `UPDATE auth SET 
              hashIdx='${hashIdx}' 
              WHERE idx=${insertId}`, 
              (err, data) => {
                if (err) 
                  return res.status(500).json({msg: '인증정보 암호화 업데이트를 실패하였습니다.'});

                res.cookie("refreshToken", hashIdx, {
                  maxAge: 1000 * 60 * 60 * 24,
                  httpOnly: true,
                });
                user.accessToken = accessToken;
                res.json({ user });
              }
            );
          }
        );
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
