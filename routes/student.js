const express = require('express');
const router = express.Router();
const { executeQuery } = require('../controllers/execueteQuery');

router.post('/api/executeQuery', executeQuery);

module.exports = router;
