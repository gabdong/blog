require("dotenv").config();

const jwt = require("jsonwebtoken");

const token = () => {
  return {
    access(id) {
      return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "30s",
      });
    },
    refresh(id) {
      return jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET, {
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
