const Profile = require('../models/profile.model');

// GET /projects?skill=python
exports.getProjectsBySkill = async (req, res) => {
    try {
        const skill = req.query.skill;
        if (!skill) return res.status(400).json({ message: 'Skill query missing' });

        const profile = await Profile.findOne();
        if (!profile) return res.status(404).json({ message: 'Profile not found' });

        const projects = profile.projects.filter(p =>
            (p.title && p.title.toLowerCase().includes(skill.toLowerCase())) ||
            (p.description && p.description.toLowerCase().includes(skill.toLowerCase()))
        );

        res.json(projects);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// GET /skills/top
exports.getTopSkills = async (req, res) => {
    try {
        const profile = await Profile.findOne();
        if (!profile) return res.status(404).json({ message: 'Profile not found' });

        const skills = profile.skills;
        // Count frequency (for single profile it’s simple)
        const topSkills = skills.slice(0, 5); // just return first 5 skills
        res.json(topSkills);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
