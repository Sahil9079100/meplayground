const express = require('express');
const router = express.Router();
const projectsController = require('../controllers/projects.controller');

router.get('/', projectsController.getProjectsBySkill);
router.get('/top-skills', projectsController.getTopSkills);

module.exports = router;
