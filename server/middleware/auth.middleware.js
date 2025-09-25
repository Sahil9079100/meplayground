const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

module.exports = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "No token, unauthorized" });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.id;
        next();
    } catch (err) {
        console.error("auth error",err);
        res.status(401).json({ message: "Invalid token" });
    }
};
