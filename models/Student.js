const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    
   
    email : {type:String},
    password : {type:String},
    city : {type:String},
    courses: [{
        courseName: {type: String},
       
        }],
    
   

    
});

const User = mongoose.model('Users',UserSchema);


module.exports = User;