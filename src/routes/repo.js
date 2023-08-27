
const express = require('express');
const router = express.Router();

const { authenticate } = require('../middleware/auth');
const RepoController = require('../controllers/RepoController');

router.get('/search', authenticate, RepoController.searchRepos);

module.exports = router;