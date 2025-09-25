const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "supersecret"; // use env in prod
const JWT_EXPIRES_IN = "7d";

exports.generateToken = (userId) => {
    return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

exports.verifyToken = (token) => {
    return jwt.verify(token, JWT_SECRET);
};