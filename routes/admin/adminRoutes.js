const express = require('express');
const adminController = require('../../controller/admin/adminController');

const router = express.Router();

router.post('/create-course',adminController.createCourse)
router.get('/courses',adminController.getAllCourses)
module.exports = router;