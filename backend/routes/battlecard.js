const express = require('express');
const router = express.Router();
const battlecardController = require('../controllers/battlecardController');

router.post('/generate', battlecardController.generateBattlecard);
router.get('/health', (req, res) => res.json({ status: 'ok' }));

module.exports = router;
