const Profile = require('../models/profile.model');

// GET /search?q=keyword
exports.search = async (req, res) => {
    try {
        const query = req.query.q;
        if (!query) return res.status(400).json({ message: 'Search query missing' });

        const profile = await Profile.findOne();
        if (!profile) return res.status(404).json({ message: 'Profile not found' });

        const lowerQuery = query.toLowerCase();
        const result = {
            projects: profile.projects.filter(p =>
                (p.title && p.title.toLowerCase().includes(lowerQuery)) ||
                (p.description && p.description.toLowerCase().includes(lowerQuery))
            ),
            work: profile.work.filter(w => w.toLowerCase().includes(lowerQuery)),
            skills: profile.skills.filter(s => s.toLowerCase().includes(lowerQuery)),
            links: profile.links.filter(l => l.toLowerCase().includes(lowerQuery)),
            name: profile.name.toLowerCase().includes(lowerQuery) ? profile.name : undefined,
            email: profile.email.toLowerCase().includes(lowerQuery) ? profile.email : undefined,
            education: profile.education.toLowerCase().includes(lowerQuery) ? profile.education : undefined
        };

        res.json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
