const chapter = require("../../models/course/chapter");
const course = require("../../models/course/course");

const createCourse = async (req, res) => {
  const { title, isFree,cost,description } = req.body;
  if (title == null || isFree == null) {
    return res.status(400).json({
      message: "Title and isFree are required",
    });
  }
  try {
    const newCourse = new course({
      title,
      isFree,
      cost , 
      description
    });
    const createdCourse = await newCourse.save();
    res.status(201).json({
      message: "Course created successfully",
      createdCourse,
    });
  } catch (error) {
    console.log("[COURSE CREATION ERROR]", error);
    console.log(error.message);
  }
};

const createChapter = async (req, res) => {
    const {courseId,title,description,isFree} = req.body;
try {
    if(courseId === null | title == null || description == null) {
        return res.status(400).json({
            message : "Title and Description is required",
        })

    }

    const newChapter = new chapter({
        courseId, title, description,isFree
    })
    const createdChapter = await newChapter.save();
    res.status(201).json({
        message: `Chapter created successfully for courseId: ${courseId}`,
        createdChapter
    })

    
} catch (error) {
    console.log('[CHAPTER_CREATION_ERROR',error)
    console.log(error.message)
}
}

const getAllCourses = async (req, res) => {
  const { title, isFree } = req.body;
  try {
    const allCourses = await course.find().populate();
    res.status(200).json({
      message: "Courses Fetched successfully",
      courses: allCourses,
    });
  } catch (error) {
    console.log("[GET ALL COURSES ERROR]", error);
    console.log(error.message);
  }
};



module.exports = { createCourse, getAllCourses , createChapter };
