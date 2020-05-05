const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const OptionSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: uuidv4
    },
    titleStart: {
        type: String,
        required: true
    },
    titleFinish: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Option', OptionSchema, 'options')