const asyncHandler = require('express-async-handler');
const NailPolish = require('../models/nailPolishModel');
const Pattern = require('../models/patternModel');

const lightOrDark = (color) => {

    // convert from hex to rgb http://gist.github.com/983661
    color = +('0x' + color.slice(1).replace(
    color.length < 5 && /./g, '$&$&'));

    const r = color >> 16;
    const g = color >> 8 & 255;
    const b = color & 255;

    // HSP equation from http://alienryderflex.com/hsp.html
    const hsp = Math.sqrt(
    0.299 * (r * r) +
    0.587 * (g * g) +
    0.114 * (b * b));

    // determine whether the color is light or dark
    return hsp > 127.5 ? 'light' : 'dark';
};

const getRandomNailPolish = asyncHandler(async (type, user) => {
    let limit = 0;
    let foundPolish = false;
    let nailPolish;

    const myNailPolishes = await NailPolish.find({ user: user._id });
    // keep trying to find the polish if not found
    while (!foundPolish && limit < 10) {
        nailPolish = myNailPolishes[Math.floor(Math.random() * myNailPolishes.length)];
        foundPolish = lightOrDark(nailPolish.color) === type;
        limit++;
    }
    return nailPolish;
});

const getRandomPattern = asyncHandler(async (user) => {
    const myPatterns = await Pattern.find({ user: user._id });
    return myPatterns[Math.floor(Math.random() * myPatterns.length)];
});

// @desc	Return a random nail polish and pattern combo based on dark/light preferences
// @route	POST /api/randomize
// @access	Private
const randomize = asyncHandler(async (req, res) => {
	if (!req.body.type) {
		res.status(400);
		throw new Error('Please make sure you selected a type');
	}

    const polish = await getRandomNailPolish(req.body.type, req.user);
    const pattern = await getRandomPattern(req.user);
    res.status(200).json([polish, pattern]);
});

module.exports = {
	randomize,
};