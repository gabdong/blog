require("dotenv").config();

const jwt = require("jsonwebtoken");

const token = () => {
  return {
    access(idx) {
      return jwt.sign({ idx }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1h",
      });
    },
    refresh(idx) {
      return jwt.sign({ idx }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "1d",
      });
    },
    check(token, mode) {
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
