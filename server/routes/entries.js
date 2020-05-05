const express = require('express');
const router = express.Router();
const { getEntriesByOption, addEntry, deleteEntry } = require('../controllers/entries')

router
    .route('/')
    .get(getEntriesByOption)
    .post(addEntry);

router
    .route('/:id')
    .delete(deleteEntry);

module.exports = router;