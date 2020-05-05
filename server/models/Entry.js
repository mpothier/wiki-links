const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const EntrySchema = new mongoose.Schema({
    _id: {
        type: String,
        default: uuidv4
    },
    optionId: {
        type: String,
        required: true
    },
    pageLinks: {
        type: [String],
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Entry', EntrySchema, 'entries')