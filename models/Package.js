const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TravelSchema = new Schema({
    
   
    city: {type:String},
    destination : {type:String},
    distance : {type:Number  , default: 0},
    price : {type:Number , default: 0},
   

    
});

const TravelPackage = mongoose.model('TravelPackage',TravelSchema);


module.exports = TravelPackage;