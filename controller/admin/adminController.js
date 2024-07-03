const course = require("../../models/course/course");

const createCourse = async (req,res)=>{
    const {title,isFree} = req.body;
    try {
        const newCourse = new course({
            title,
            isFree
        })
        const createdCourse = await newCourse.save();
        res.status(201).json({
            message : 'Course created successfully',createdCourse
        })
        
    } catch (error) {
        console.log('[COURSE CREATION ERROR]',error)
        console.log(error.message)
        
    }
}


const getAllCourses = async (req,res)=>{
    const {title,isFree} = req.body;
    try {
        const allCourses = await course.find()
        res.status(200).json({
            message : 'Courses Fetched successfully',courses:allCourses
        })
    
        
    } catch (error) {
        console.log('[GET ALL COURSES ERROR]',error)
        console.log(error.message)
        
    }
}
module.exports = {createCourse,getAllCourses};