const express = require('express');
const router = express.Router();

//routes
router.get('/', getAll);

module.exports = router;