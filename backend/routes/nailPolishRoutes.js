const express = require('express');
const router = express.Router();
const { getNailPolishes, addNailPolish, updateNailPolish, deleteNailPolish } = require('../controllers/nailPolishController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getNailPolishes).post(protect, addNailPolish);
router.route('/:id').put(protect, updateNailPolish).delete(protect, deleteNailPolish);

module.exports = router;