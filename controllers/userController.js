const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
    generateAccessToken,
    generateRefreshToken,
} = require("../utils/tokens");
require("dotenv").config();

const register = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.create({ username, password });
        res.set("Content-Type", "application/json");
        res.status(201).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to register user" });
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ where: { username } });

        if (!user) return res.status(404).json({ error: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(400).json({ error: "Invalid password" });

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
        });
        res.set("Content-Type", "application/json");
        res.json({ accessToken });
    } catch (error) {
        res.status(500).json({ error: "Failed to login" });
    }
};

const refreshToken = (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(401);

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);

        const newAccessToken = generateAccessToken(user);
        res.set("Content-Type", "application/json");
        res.json({ accessToken: newAccessToken });
    });
};

const logout = (req, res) => {
    res.clearCookie("refreshToken");
    res.sendStatus(204);
};

module.exports = { register, login, refreshToken, logout };
