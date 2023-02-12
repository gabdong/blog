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
router.post("/login", async (req, res) => {
  const { id, password } = req.body;

  try {
    const [userRes] = await db.query(`
      SELECT idx, id, name, phone, email 
      FROM members 
      WHERE id='${id}' 
      AND password='${password}'
    `);

    if (userRes.length === 0) {
      const err = new Error("잘못된 아이디 또는 비밀번호입니다.");
      err.statusCode = 404;
      throw err;
    }

    const user = userRes[0];
    const { idx } = user;

    //* Token 발행
    const accessToken = token().access(idx);
    const refreshToken = token().refresh(idx);

    //* refreshToken 저장
    const [refreshTokenRes] = await db.query(`
      SELECT hash_idx AS hashIdx
      FROM tokens
      WHERE member='${idx}'
    `);

    let hashIdx;
    if (refreshTokenRes.length > 0) {
      //* 이미 refreshToken 정보 있을경우 update
      hashIdx = refreshTokenRes[0].hashIdx;

      await db.query(`
        UPDATE tokens SET 
        refresh_token='${refreshToken}' 
        WHERE hash_idx='${hashIdx}'
      `);
    } else {
      //*  refreshToken 정보 없을경우 insert
      const [insertTokenRes] = await db.query(`
        INSERT INTO tokens SET 
        refresh_token='${refreshToken}',
        member='${idx}'
      `);

      const { insertId } = insertTokenRes;

      hashIdx = md5(`${process.env.REFRESH_TOKEN_HASH_IDX_KEY}${insertId}`);

      await db.query(`
        UPDATE tokens SET
        hash_idx='${hashIdx}'
        WHERE idx=${insertId}
      `);
    }

    res.cookie("refreshToken", hashIdx, {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
    });
    res.json({ msg: "SUCCESS", user, accessToken });
  } catch (err) {
    res.status(err.statusCode).json({ msg: err.message });
  }
});

module.exports = router;
