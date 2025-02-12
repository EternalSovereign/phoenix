const jwt = require("jsonwebtoken");
require("dotenv").config();

function authenticateToken(req, res, next) {
    const authHeader =
        req.headers["authorization"] || req.headers["Authorization"];
    if (!authHeader) return res.sendStatus(401);
    const token = authHeader && authHeader.split("Bearer ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            if (err.name === "TokenExpiredError") {
                return res
                    .status(403)
                    .json({ message: "Token expired, please refresh" });
            }
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    });
}

module.exports = { authenticateToken };
