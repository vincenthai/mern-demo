const express = require('express');
const router = express.Router();
const { randomize } = require('../controllers/randomizerController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').post(protect, randomize);

module.exports = router;