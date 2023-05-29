const express = require("express");
const router = express.Router();
const db = require("../config/db");
const token = require("../config/jwt");
const md5 = require("md5");

//* 로그인
router.post("/login", async (req, res) => {
  const { id, password } = req.body;

  try {
    //TODO 암호 암호화
    const [userRes] = await db.query(
      `
      SELECT idx, id, name, phone, email 
      FROM members 
      WHERE id=? 
      AND password=?
    `,
      [id, password]
    );

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
    const [refreshTokenRes] = await db.query(
      `
      SELECT hash_idx AS hashIdx
      FROM tokens
      WHERE member=?
    `,
      [idx]
    );

    let hashIdx;
    if (refreshTokenRes.length > 0) {
      //* 이미 refreshToken 정보 있을경우 update
      hashIdx = refreshTokenRes[0].hashIdx;

      //TODO error
      await db.query(
        `
        UPDATE tokens SET 
        refresh_token=? 
        WHERE hash_idx=?
      `,
        [refreshToken, hashIdx]
      );
    } else {
      //TODO error
      //*  refreshToken 정보 없을경우 insert
      const [insertTokenRes] = await db.query(
        `
        INSERT INTO tokens SET 
        refresh_token=?,
        member=?
      `,
        [refreshToken, idx]
      );

      const { insertId } = insertTokenRes;

      hashIdx = md5(`${process.env.REFRESH_TOKEN_HASH_IDX_KEY}${insertId}`);

      //TODO error
      await db.query(
        `
        UPDATE tokens SET
        hash_idx=?
        WHERE idx=?
      `,
        [hashIdx, insertId]
      );
    }

    res.cookie("refreshToken", hashIdx, {
      maxAge: 1000 * 60 * 60 * 24, // 1일
      httpOnly: true,
    });
    res.json({ msg: "SUCCESS", user, accessToken });
  } catch (err) {
    if (err.statusCode) {
      res.status(err.statusCode).json({ msg: err.message });
    } else {
      throw err;
    }
  }
});

module.exports = router;
