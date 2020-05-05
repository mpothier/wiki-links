const Entry = require('../models/Entry')

// @desc    Get all entries of a given option
// @route   GET /api/v1/entries?optionId=<optionId>
// @access  Public
exports.getEntriesByOption = async (req, res, next) => {
    try {
        const entries = await Entry.find({optionId: req.query.optionId});
        return res.status(200).json({
            success: true,
            count: entries.length,
            data: entries
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        })
    }
}

// @desc    Add new entry
// @route   POST /api/v1/entries
// @access  Public
exports.addEntry = async (req, res, next) => {
    try {
        const entry = await Entry.create(req.body)
        return res.status(201).json({
            success: true,
            data: entry
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        })
    }
}

// @desc    Delete entry
// @route   DELETE /api/v1/entries/:id
// @access  Private
exports.deleteEntry = async (req, res, next) => {
    try {
        const entry = await Entry.findById(req.params.id);
        if (!entry) {
            return res.status(404).json({
                success: false,
                error: 'No entry found'
            })
        }
        await entry.remove();
        return res.status(200).json({
            success: true,
            data: req.params.id
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        })
    }
}