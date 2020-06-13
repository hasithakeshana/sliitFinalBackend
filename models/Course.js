const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
    
   
    name: {type:String},
    category : {type:String},
    trainer : {type:String },
    description : {type:String },
    image : {type:String },
    fee : {type:Number , default:0 },
    date: { type: Date, default: Date.now },
    noOfParticipants : {type:Number , default:0 },
    partcipants: [{
    email: {type: String},
   
    }],
   
   

    
});

// ratings: [{
//     userName: {type: String},
//     rate : {type: Number},
//     comment : {type : String},
//     date : {type: Date}
//      }],



const Course = mongoose.model('Courses',CourseSchema);


module.exports = Course;