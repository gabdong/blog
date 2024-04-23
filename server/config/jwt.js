require("dotenv").config();

const jwt = require("jsonwebtoken");

const token = () => {
  return {
    access(idx) { // accessToken 발급
      return jwt.sign({ idx }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "15m",
      });
    },
    refresh(idx) { // refreshToken 발급
      return jwt.sign({ idx }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "1d",
      });
    },
    check(token, mode) { // token 유효성 확인
      const secret_key =
        mode == "access"
          ? process.env.ACCESS_TOKEN_SECRET
          : process.env.REFRESH_TOKEN_SECRET;

      const auth = jwt.verify(token, secret_key, (err, decodedData) => {
        if (err) return false;

        return decodedData;
      });

      return auth;
    },
  };
};

module.exports = token;
