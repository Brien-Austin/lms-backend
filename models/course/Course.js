const mongoose = require('mongoose')
const chapter = require('./chapter').schema



const courseSchema = new mongoose.Schema({

    title : {
        type : String,
        required : true,

    },
    description : {
        type : String,
        
    },
    image: {
        type : String,
        
    },
    cost : {
        type : Number,
        
    },
    isFree : {
        type : Boolean,
        required : true,
    },
    Chapters :[
        chapter
      
    ],

    createdAt : {
        type : Date ,
        default : Date.now()
    },
    updatedAt : {
        type : Date ,
        default : Date.now()
    },



})

courseSchema.pre('save', function(next){
    this.updatedAt = new Date();
    next();
})

module.exports = mongoose.model('Course', courseSchema) || mongoose.models.Course