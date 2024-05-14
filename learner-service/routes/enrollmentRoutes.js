const express = require('express');
const router = express.Router();
const enrollmentController = require('../controllers/enrollmentController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/enroll/:id', authMiddleware.authenticateJWT, enrollmentController.enroll);
router.put('/update/:id', authMiddleware.authenticateJWT, enrollmentController.updateProgress); 
router.get('/progress/:id', authMiddleware.authenticateJWT, enrollmentController.seeProgress);
router.get('/progress', authMiddleware.authenticateJWT, enrollmentController.seeAllprogress);

module.exports = router;