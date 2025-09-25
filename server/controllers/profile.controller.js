const Profile = require("../models/profile.model");
const { generateToken } = require("../utils/jwt");

// GET /profile (auth required)
exports.getProfile = async (req, res) => {
    try {
        const profile = await Profile.findById(req.userId);
        if (!profile) return res.status(404).json({ message: "Profile not found" });
        res.json(profile);
    } catch (err) {
        console.error("profile error",err);
        res.status(500).json({ message: err.message });
    }
};

// POST /profile (public)
exports.createProfile = async (req, res) => {
    try {
        const profile = new Profile(req.body);
        await profile.save();

        // Generate token
        const token = generateToken(profile._id);

        // Send token in httpOnly cookie
        res
            .cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "None",
            })
            .status(201)
            .json(profile);
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: err.message });
    }
};

// PUT /profile (auth required)
exports.updateProfile = async (req, res) => {
    try {
        const profile = await Profile.findByIdAndUpdate(req.userId, req.body, {
            new: true,
        });
        if (!profile) return res.status(404).json({ message: "Profile not found" });
        res.json(profile);
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: err.message });
    }
};
