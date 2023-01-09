const express = require("express");
const apis = express();
const bodyParser = require("body-parser");
const db = require("../config/db");
const { getCookie } = require("../utils/utils");
const token = require("../config/jwt");

apis.use(bodyParser.json());
apis.use(bodyParser.urlencoded({ extended: true }));

//* refresh token 삭제
apis.delete("/", (req, res) => {
  const hashIdx = getCookie(req.headers.cookie, "refreshToken");

  db.query(
    `DELETE FROM tokens
    WHERE hash_idx='${hashIdx}'`,
    (err, data) => {
      if (err) res.status(500).json({ msg: "토큰정보 삭제를 실패하였습니다." });

      res.cookie("refreshToken", "", {
        httpOnly: true,
        maxAge: 0,
      });
      res.send("Logout");
    }
  );
});

//* token 유효성 검사, refreshToken만 있는경우 token 재발급
apis.get("/check-token", (req, res) => {
  const { authorization } = req.headers;
  const accessToken = authorization?.split(" ")[1];
  const checkAccessToken = token().check(accessToken, "access");

  if (!checkAccessToken) {
    const refreshTokenIdx = getCookie(req.headers.cookie, "refreshToken");
    db.query(
      `SELECT refresh_token 
      FROM tokens 
      WHERE hash_idx='${refreshTokenIdx}'`,
      (err, data) => {
        if (err)
          return res.status(500).json({ msg: "토큰 요청을 실패하였습니다." });

        const refreshToken = data.length > 0 ? data[0].refresh_token : null;
        const checkRefreshToken = token().check(refreshToken, "refresh");

        if (!checkRefreshToken)
          return res.status(401).json({ msg: "권한이 없습니다." });

        const { idx } = checkRefreshToken;
        const newAccessToken = token().access(idx);
        const newRefreshToken = token().refresh(idx);

        db.query(
          `SELECT idx, id, name, phone, email 
          FROM members 
          WHERE idx=${idx}`,
          (err, data) => {
            if (err)
              return res
                .status(500)
                .json({ msg: "유저정보 요청을 실패하였습니다." });

            if (data.length === 0)
              return res
                .status(404)
                .json({ msg: "유저정보를 찾을수 없습니다." });

            const user = data[0];

            db.query(
              `UPDATE tokens SET 
              refresh_token='${newRefreshToken}' 
              WHERE member='${idx}'`,
              (err, data) => {
                if (err)
                  return res.status(500).json({
                    msg: "인증정보 암호화 업데이트를 실패하였습니다.",
                  });

                db.query(
                  `SELECT hash_idx 
                  FROM tokens 
                  WHERE member='${idx}'`,
                  (err, data) => {
                    if (err)
                      return res
                        .status(500)
                        .json({ msg: "토큰 hash idx요청을 실패하였습니다." });

                    const hashIdx = data[0].hash_idx;

                    res.cookie("refreshToken", hashIdx, {
                      maxAge: 1000 * 60 * 60 * 24,
                      httpOnly: true,
                    });
                    res.json({ status: 200, newAccessToken, auth: true, user });
                  }
                );
              }
            );
          }
        );
      }
    );
  } else {
    res.json({ status: 200, auth: true });
  }
});

module.exports = apis;
