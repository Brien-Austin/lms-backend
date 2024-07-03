const mongoose = require('mongoose')

const chapterSchema = new mongoose.Schema({

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
 
    isFree : {
        type : Boolean,
        required : true,
    }

})

module.exports = mongoose.model('Chapter', chapterSchema) || mongoose.models.Course