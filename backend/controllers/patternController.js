const asyncHandler = require('express-async-handler');
const Pattern = require('../models/patternModel');

// @desc	Get patterns
// @route	GET /api/patterns
// @access	Private
const getPatterns = asyncHandler(async (req, res) => {
	const patterns = await Pattern.find({ user: req.user.id });

	res.status(200).json(patterns);
});

// @desc	Add pattern
// @route	POST /api/patterns
// @access	Private
const addPattern = asyncHandler(async (req, res) => {
	if (!req.body.text) {
		res.status(400);
		throw new Error('Please add a text field');
	}

	const pattern = await Pattern.create({
		text: req.body.text,
		user: req.user.id,
	});
	res.status(200).json(pattern);
});

// @desc	Update pattern
// @route	PUT /api/patterns/:id
// @access	Private
const updatePattern = asyncHandler(async (req, res) => {
	const pattern = await Pattern.findById(req.params.id);

	if (!pattern) {
		res.status(400);
		throw new Error('Pattern not found');
	}

	// Check for user
	if (!req.user) {
		res.status(401);
		throw new Error('User not found');
	}

	// Ensure the logged in user matches the pattern's user
	if (pattern.user.toString() !== req.user.id) {
		res.status(401);
		throw new Error('User not authorized');
	}

	const updatedPattern = await Pattern.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
	});

	res.status(200).json(updatedPattern);
});

// @desc	Delete pattern
// @route	DELETE /api/patterns/:id
// @access	Private
const deletePattern = asyncHandler(async (req, res) => {
	const pattern = await Pattern.findById(req.params.id);

	if (!pattern) {
		res.status(400);
		throw new Error('Pattern not found');
	}

	// Check for user
	if (!req.user) {
		res.status(401);
		throw new Error('User not found');
	}

	// Ensure the logged in user matches the pattern's user
	if (pattern.user.toString() !== req.user.id) {
		res.status(401);
		throw new Error('User not authorized');
	}

	await pattern.remove();

	res.status(200).json({ id: req.params.id });
});

module.exports = {
	getPatterns, addPattern, updatePattern, deletePattern,
};