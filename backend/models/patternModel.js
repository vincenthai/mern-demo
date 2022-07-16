const mongoose = require('mongoose');

const patternSchema = mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'User',
	},
    text: {
		type: String,
		required: [true, 'Please add a pattern text'],
	},
}, {
	timestamps: true,
});

module.exports = mongoose.model('Pattern', patternSchema);