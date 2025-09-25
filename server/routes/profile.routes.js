const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");
const profileController = require("../controllers/profile.controller");

// Public route (create new profile)
router.post("/", profileController.createProfile);

// Protected routes (need token cookie)
router.get("/", auth, profileController.getProfile);
router.put("/", auth, profileController.updateProfile);

module.exports = router;