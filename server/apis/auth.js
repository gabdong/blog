const express = require("express");
const apis = express();
const bodyParser = require("body-parser");
const { getCookie } = require("../utils/utils");
const token = require("../config/jwt");

apis.use(bodyParser.json());
apis.use(bodyParser.urlencoded({ extended: true }));

/**
 * * accessToken이 만료되고 refresh 토큰있는경우 둘다 재발급
 */
apis.get("/refresh", (req, res) => {
  const authorization = req.headers.Authorization;
  const accessToken = authorization ? authorization.split(" ")[1] : null;
  const refreshToken = getCookie(req.headers.cookie, "auth");
  const user = accessToken
    ? token().check(accessToken, "access") ||
      token().check(refreshToken, "refresh")
    : token().check(refreshToken, "refresh");

  if (!user) res.status(401).json({ msg: "로그인이 되어있지 않습니다." });

  const result = {};
  const { id } = user;

  //g token 갱신
  const newAccessToken = token().access(id);
  const newRefreshToken = token().refresh(id);

  res.cookie("auth", newRefreshToken, {
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true,
  });
  result.accessToken = newAccessToken;
  result.user = user;

  res.json(result);
});

/**
 * * delete refresh token
 */
apis.delete("/", (req, res) => {
  res.cookie("auth", "", {
    httpOnly: true,
    maxAge: 0,
  });
  res.send("Logout");
});

/**
 * * token 유효성 검사, refreshToken만 있는경우 token 재발급
 */
apis.get("/verify-token", (req, res) => {
  const accessToken = req.headers.Authorization;
  const refreshToken = getCookie(req.headers.cookie, "auth");

  const result = {};
  const verify = accessToken
    ? token().check(accessToken, "access")
    : token().check(refreshToken, "refresh");

  if (!verify) res.status(401).json({ msg: "권한이 없습니다." });

  if (!accessToken) {
    const { id } = verify;
    const newAccessToken = token().access(id);
    const newRefreshToken = token().refresh(id);

    res.cookie("auth", newRefreshToken, {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
    });

    result.accessToken = newAccessToken;
  }
  const auth = verify ? true : false;

  result.auth = auth;

  res.json({ result });
});

module.exports = apis;
