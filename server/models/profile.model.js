const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    links: [String],
});

const ProfileSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    education: String,
    skills: [String],
    projects: [ProjectSchema],
    work: [String],
    links: [String],
});

module.exports = mongoose.model('Profile', ProfileSchema);
