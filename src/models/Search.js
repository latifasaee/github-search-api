const mongoose = require('mongoose');

const searchSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    keyword: {
        type: String,
        required: true,
        trim: true

    },
}, {
    timestamps: true
});

const Search = mongoose.model('Search', searchSchema);

module.exports = Search;