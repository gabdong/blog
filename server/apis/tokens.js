const express = require("express");
const router = express.Router();
const db = require("../config/db");
const { getCookie } = require("../utils/utils");
const token = require("../config/jwt");

//* refresh token 삭제
router.delete("/", async (req, res) => {
  const hashIdx = getCookie(req.headers.cookie, "refreshToken");

  await db.query(
    `
    DELETE FROM tokens
    WHERE hash_idx=? 
  `,
    [hashIdx]
  );

  res.cookie("refreshToken", "", {
    httpOnly: true,
    maxAge: 0,
  });

  res.json({ msg: "SUCCESS" });
});

//* token 유효성 검사, refreshToken만 있는경우 token 재발급
router.get("/check-token", async (req, res) => {
  const { authorization } = req.headers;

  try {
    const accessToken = authorization?.split(" ")[1];
    const checkAccessToken = token().check(accessToken, "access");

    if (!checkAccessToken) {
      //* accessToken false일경우 refreshToken 검증
      const refreshTokenIdx = getCookie(req.headers.cookie, "refreshTokenIdx");
      const [refreshTokenRes] = await db.query(
        `
        SELECT refresh_token AS refreshToken
        FROM tokens 
        WHERE hash_idx=?
      `,
        [refreshTokenIdx]
      );

      if (refreshTokenRes.length === 0) {
        const err = new Error("권한이 없습니다.");
        err.status = 401;
        throw err;
      }

      const refreshToken = refreshTokenRes[0].refreshToken;
      const checkRefreshToken = token().check(refreshToken, "refresh");

      if (!checkRefreshToken) {
        const err = new Error("권한이 없습니다.");
        err.status = 401;
        throw err;
      }

      const { idx } = checkRefreshToken;
      const newAccessToken = token().access(idx);
      const newRefreshToken = token().refresh(idx);

      const [userRes] = await db.query(
        `
        SELECT idx, id, name, phone, email
        FROM members
        WHERE idx=?
      `,
        [idx]
      );

      if (userRes.length === 0) {
        const err = new Error("유저정보를 찾을 수 없습니다.");
        err.status = 404;
        throw err;
      }

      const user = userRes[0];

      await db.query(
        `
        UPDATE tokens SET
        refresh_token=? 
        WHERE member=?
      `,
        [newRefreshToken, idx]
      );

      const [hashIdxRes] = await db.query(
        `
        SELECT hash_idx AS hashIdx 
        FROM tokens 
        WHERE member=?
      `,
        [idx]
      );

      if (hashIdxRes.length === 0) {
        const err = new Error("토큰 hash idx요청을 실패하였습니다.");
        err.status = 500;
        throw err;
      }

      const hashIdx = hashIdxRes[0].hashIdx;

      res.cookie("refreshTokenIdx", hashIdx, {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
      });
      res.json({
        msg: "SUCCESS",
        status: 200,
        newAccessToken,
        auth: true,
        user,
      });
    } else {
      const { idx } = checkAccessToken;
      const [userRes] = await db.query(
        `
        SELECT idx, id, name, phone, email
        FROM members
        WHERE idx=?
      `,
        [idx]
      );

      if (userRes.length === 0) {
        const err = new Error("유저정보를 찾을 수 없습니다.");
        err.status = 404;
        throw err;
      }

      const user = userRes[0];
      res.json({ msg: "SUCCESS", status: 200, auth: true, user });
    }
  } catch (err) {
    if (err.status) {
      res.status(err.status).json({ msg: err.message });
    } else {
      res.status(500).json({ msg: "토큰 유효성검사를 실패하였습니다." });
    }
  }
});

module.exports = router;
