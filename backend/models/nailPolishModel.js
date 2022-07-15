const mongoose = require('mongoose');

const nailPolishSchema = mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'User',
	},
    color: {
        type: String,
        required: [true, 'Please choose a color'],
    },
    type: {
        type: String,
        enum: ['Sparkly', 'Cream', 'Gelly'],
        required: [true, 'Select a type'],
    },
}, {
	timestamps: true,
});

module.exports = mongoose.model('NailPolish', nailPolishSchema);