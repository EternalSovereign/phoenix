const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateAccessToken = (user) => {
    return jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "15m",
    });
};

const generateRefreshToken = (user) => {
    return jwt.sign({ id: user.id }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "7d",
    });
};

module.exports = { generateAccessToken, generateRefreshToken };
