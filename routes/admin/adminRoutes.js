const express = require("express");
const adminController = require("../../controller/admin/adminController");

const router = express.Router();

router.post("/create-course", adminController.createCourse);
router.post("/create-chapters", adminController.createChapter)
router.get("/courses", adminController.getAllCourses);
module.exports = router;
