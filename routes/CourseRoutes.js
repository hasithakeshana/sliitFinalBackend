const express = require('express');
const router = express.Router();
const multer = require('multer');
const Course = require('../models/Course');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    // filename: function(req,file,cb){
    //     cb(null, new Date().toISOString().replace(/:/g, '-') +'-'+ file.originalname);
    // }
    filename: function (req, file, cb) {
        //cb(null, Date.now() + file.originalname);
        cb(null, new Date().toISOString() + file.originalname);
    }
});

const upload = multer({storage: storage});





router.post("/saveCourse", upload.single('image') ,function (req, res) {   // add a course

    console.log(req.file);

    const course = new Course({

        name : req.body.name,
        category : req.body.category,
        trainer : req.body.trainer,
        description : req.body.description,
        image: req.file.filename,
        fee  : req.body.fee,
        date : req.body.date,

    });

    course.save().then(function (dbProduct) {

        res.json(dbProduct);
    })
        .catch(function (err) {
            // If an error occurred, send it to the client
            res.json(err);
        });


});


router.get('/allCourses', async (req, res, next) => {
    try {

        const courses = await Course.find();
        res.send(JSON.stringify({course: courses}));


    } catch (e) {

        next(e);
    }
});

router.get('/course/:id', async (req, res, next) => {
    try {

        const course = await Course.findOne({_id: req.params.id});

        console.log(course);
        res.send(JSON.stringify({message: "course details", course: course}));

      } catch (e) {
        
        next(e)
    }
});

// relavent course details

router.get("/getTotalOfCourses", async (req, res, next) => {  

    try{

        var arr1 = [];
        var arr2 = [];



        const courses = await Course.find();
        console.log(courses);

        for(let c of courses)
        {
            console.log('cq', c.partcipants.length);
            console.log('cq name',c.name);
            arr1.push(c.partcipants.length);
            arr2.push(c.name);

        }


        res.send(JSON.stringify({message: "course details",array1:arr1,array2:arr2}));

    }
    catch(e){

    }

});






















module.exports = router;