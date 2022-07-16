const asyncHandler = require('express-async-handler');
const NailPolish = require('../models/nailPolishModel');

// @desc	Get nail polishes
// @route	GET /api/nail-polish
// @access	Private
const getNailPolishes = asyncHandler(async (req, res) => {
	const polishes = await NailPolish.find({ user: req.user.id });

	res.status(200).json(polishes);
});

// @desc	Add nail polish
// @route	POST /api/nail-polish
// @access	Private
const addNailPolish = asyncHandler(async (req, res) => {
	if (!req.body.color || !req.body.type) {
		res.status(400);
		throw new Error('Please make sure you supplied all required fields');
	}

	const nailPolish = await NailPolish.create({
		user: req.user.id,
        color: req.body.color,
        type: req.body.type,
	});
	res.status(200).json(nailPolish);
});

// @desc	Update nail polish
// @route	PUT /api/nail-polish/:id
// @access	Private
const updateNailPolish = asyncHandler(async (req, res) => {
	const nailPolish = await NailPolish.findById(req.params.id);

	if (!nailPolish) {
		res.status(400);
		throw new Error('Nail polish not found');
	}

	// Check for user
	if (!req.user) {
		res.status(401);
		throw new Error('User not found');
	}

	// Ensure the logged in user matches the nail polish's user
	if (nailPolish.user.toString() !== req.user.id) {
		res.status(401);
		throw new Error('User not authorized');
	}

	const updatedNailPolish = await NailPolish.findByIdAndUpdate(req.params.id, {
        color: req.body.color,
        type: req.body.type,
    }, {
		new: true,
	});

	res.status(200).json(updatedNailPolish);
});

// @desc	Delete a nail polish
// @route	DELETE /api/nail-polish/:id
// @access	Private
const deleteNailPolish = asyncHandler(async (req, res) => {
	const nailPolish = await NailPolish.findById(req.params.id);

	if (!nailPolish) {
		res.status(400);
		throw new Error('Nail polish not found');
	}

	// Check for user
	if (!req.user) {
		res.status(401);
		throw new Error('User not found');
	}

	// Ensure the logged in user matches the nail polish's user
	if (nailPolish.user.toString() !== req.user.id) {
		res.status(401);
		throw new Error('User not authorized');
	}

	await nailPolish.remove();

	res.status(200).json({ id: req.params.id });
});

module.exports = {
	getNailPolishes, addNailPolish, updateNailPolish, deleteNailPolish,
};