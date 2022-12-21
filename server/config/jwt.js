require('dotenv').config();

const jwt = require('jsonwebtoken');

const token = () => {
    return {
        access(id) {
            return jwt.sign({id}, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: "15m",
            });
        },
        refresh(id) {
            return jwt.sign({id}, process.env.REFRESH_TOKEN_SECRET, {
                expiresIn: '1days',
            });
        },
        check(token, mode) {
            const secret_key = mode == 'access' ? process.env.ACCESS_TOKEN_SECRET : process.env.REFRESH_TOKEN_SECRET;

            return jwt.verify(token, secret_key);
        }
    }
}

module.exports = token;