require("dotenv").config();
const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const db = require("../config/db");
const token = require("../config/jwt");
const md5 = require("md5");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

//* 로그인
router.post("/login", (req, res) => {
  const { id, password } = req.body;

  //* 로그인 정보 확인
  //TODO 보안처리
  db.query(
    `SELECT idx, id, name, phone, email 
    FROM members 
    WHERE id='${id}' 
    AND password='${password}'`,
    (err, data) => {
      if (err)
        return res.status(500).json({ msg: "회원정보를 불러오지 못했습니다." });

      const isLogin = data.length === 0 ? false : true;

      if (!isLogin) {
        res.status(404).json({
          msg: "아이디 또는 비밀번호를 잘못 입력했습니다. 입력하신 내용을 다시 확인해주세요.",
        });
      } else if (isLogin) {
        const user = data[0];
        const { idx } = user;

        //* Token 발행
        const accessToken = token().access(idx);
        const refreshToken = token().refresh(idx);

        //* refreshToken 저장
        db.query(
          `SELECT hash_idx 
          FROM tokens 
          WHERE member='${idx}'`,
          (err, data) => {
            let hashIdx;

            if (err)
              return res
                .status(500)
                .json({ msg: "토큰검색을 실패하였습니다." });
            if (data.length > 0) {
              //* 이미 refresh token 정보 저장되어있을경우 update
              hashIdx = data[0].hash_idx;

              db.query(
                `UPDATE tokens 
                SET refresh_token='${refreshToken}' 
                WHERE hash_idx='${hashIdx}'`,
                (err, data) => {
                  if (err)
                    return res
                      .status(500)
                      .json({ msg: "토큰 업데이트를 실패하였습니다." });
                  res.cookie("refreshToken", hashIdx, {
                    maxAge: 1000 * 60 * 60 * 24,
                    httpOnly: true,
                  });
                  res.json({ msg: "SUCCESS", user, accessToken });
                }
              );
            } else {
              //* refresh token 정보 없을경우 insert
              db.query(
                `INSERT INTO tokens SET 
                refresh_token='${refreshToken}', 
                member='${idx}'`,
                (err, data) => {
                  if (err)
                    return res
                      .status(500)
                      .json({ msg: "인증정보 저장을 실패하였습니다." });

                  const { insertId } = data;
                  hashIdx = md5(
                    `${process.env.REFRESH_TOKEN_HASH_IDX_KEY}${insertId}`
                  );

                  db.query(
                    `UPDATE tokens SET 
                    hash_idx='${hashIdx}' 
                    WHERE idx=${insertId}`,
                    (err, data) => {
                      if (err)
                        return res.status(500).json({
                          msg: "인증정보 암호화 업데이트를 실패하였습니다.",
                        });
                      res.cookie("refreshToken", hashIdx, {
                        maxAge: 1000 * 60 * 60 * 24,
                        httpOnly: true,
                      });
                      res.json({ msg: "SUCCESS", user, accessToken });
                    }
                  );
                }
              );
            }
          }
        );
      }
    }
  );
});

module.exports = router;
