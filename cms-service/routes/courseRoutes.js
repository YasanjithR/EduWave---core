const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/add', authMiddleware.authenticateJWT, authMiddleware.isInstructor, courseController.addCourse);
router.put('/update/:id', authMiddleware.authenticateJWT, authMiddleware.isInstructor, courseController.updateCourse);
router.delete('/delete/:id', authMiddleware.authenticateJWT, authMiddleware.isInstructor, courseController.deleteCourse)
router.put('/approve/:id', authMiddleware.authenticateJWT, authMiddleware.isAdmin, courseController.approveCourse);
router.get('/get/:id', authMiddleware.authenticateJWT, courseController.getCourse);
router.get('/get', authMiddleware.authenticateJWT, courseController.getCourses);
router.get('/get/instructor/:id', authMiddleware.authenticateJWT, authMiddleware.isInstructor, courseController.getCoursesByInstructor);
router.get('/get/approved', authMiddleware.authenticateJWT, courseController.getApprovedCourses);

module.exports = router;