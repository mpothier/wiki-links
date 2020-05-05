const express = require('express');
const router = express.Router();
const { getOptions, addOption, deleteOption } = require('../controllers/options')

router
    .route('/')
    .get(getOptions)
    .post(addOption);

router
    .route('/:id')
    .delete(deleteOption);

module.exports = router;