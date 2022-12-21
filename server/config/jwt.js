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
        }
    }
}

module.exports = token;