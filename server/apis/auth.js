const express = require("express");
const apis = express();
const bodyParser = require("body-parser");
const {getCookie} = require("../utils/utils");
const token = require("../config/jwt");

apis.use(bodyParser.json());
apis.use(bodyParser.urlencoded({ extended: true }));

apis.post('/refresh', (req, res) => {
    // console.log(req.headers.coookie);
    res.send('hihello');
});

//g refresh auth
apis.post("/refreshAuth", (req, res) => {
    const authHeader = req.headers["authorization"];
    const accessToken = authHeader
        ? authHeader && authHeader.split(" ")[1]
        : null;
    const refreshToken = getCookie(req.headers.cookie, "auth");
    const result = {};
    const auth = accessToken
        ? token().check(accessToken, "access") ||
        token().check(refreshToken, "refresh")
        : token().check(refreshToken, "refresh");
    const isAccessToken = accessToken && token().check(accessToken, "access") ? true : false;

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

//g delete refresh token
apis.delete("/", (req, res) => {
    res.cookie("auth", "", {
        httpOnly: true,
        maxAge: 0,
    });
    res.send("Logout");
});

module.exports = apis;