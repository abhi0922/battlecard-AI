const express = require('express');
const router = express.Router();
const intelligenceController = require('../controllers/intelligenceController');

router.post('/intelligence', intelligenceController.generateIntelligence);

module.exports = router;
