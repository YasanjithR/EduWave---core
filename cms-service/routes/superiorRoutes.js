const express = require('express');
const router = express.Router();
const superiorController = require('../controllers/superiorController');

router.post('/register', superiorController.register);
router.post('/login', superiorController.login);

module.exports = router;