const express = require('express');
const routes = require('./routes/packageRoutes');
const courseRoutes = require('./routes/CourseRoutes');
const studentRoutes = require('./routes/UserRoutes');

const mongoose = require('mongoose');

var cors = require('cors');

const app = express();

app.use(cors());

// connect to mongodb
//mongoose.connect('mongodb://localhost/DSAssignment');
mongoose.Promise = global.Promise;

const uri = "mongodb+srv://hasitha:9812sliit@cluster0-jcdhk.mongodb.net/Test?retryWrites=true&w=majority";

mongoose.connect(uri, { useUnifiedTopology: true   , useFindAndModify: false},()=>{

    console.log("DB connected");
});


app.use(express.json());  //  useNewUrlParser: true, useFindAndModify: false

app.use(express.urlencoded({extended:true}));


app.use('/course',courseRoutes);
app.use('/student',studentRoutes);


app.listen(4000,function(){

    console.log('now listening for requests');
});