const Option = require('../models/Option')

// @desc    Get all options (or find matching option(s) based on optional query parameters)
// @route   GET /api/v1/options [?titleStart=<titleStart>&titleFinish=<titleFinish>]
// @access  Public
exports.getOptions = async (req, res, next) => {
    try {
        const options = await Option.find(req.query);
        return res.status(200).json({
            success: true,
            count: options.length,
            data: options
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        })
    }
}

// @desc    Add new option
// @route   POST /api/v1/options
// @access  Public
exports.addOption = async (req, res, next) => {
    try {
        // Check if exact option already exists
        const existingOptions = await Option.find(req.body);
        if (existingOptions.length > 0) {
            return res.status(403).json({
                success: false,
                error: 'Duplicate option'
            })
        }
        // Create new document in database
        const option = await Option.create(req.body)
        return res.status(201).json({
            success: true,
            data: option
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        })
    }
}

// @desc    Delete option
// @route   DELETE /api/v1/options/:id
// @access  Private
exports.deleteOption = async (req, res, next) => {
    try {
        const option = await Option.findById(req.params.id);
        if (!option) {
            return res.status(404).json({
                success: false,
                error: 'No option found'
            })
        }
        await option.remove();
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