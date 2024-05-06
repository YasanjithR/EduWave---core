const express = require('express');
const router = express.Router();
const learnerController = require('../controllers/learnerController');

router.post('/register', learnerController.register);
router.post('/login', learnerController.login);

module.exports = router;