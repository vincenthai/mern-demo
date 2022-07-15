const express = require('express');
const router = express.Router();
const { getPatterns, addPattern, updatePattern, deletePattern } = require('../controllers/patternController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getPatterns).post(protect, addPattern);
router.route('/:id').put(protect, updatePattern).delete(protect, deletePattern);

module.exports = router;