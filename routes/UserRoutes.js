const express = require('express');
const router = express.Router();

const Student = require('../models/Student');
const Course = require('../models/Course');
var jwt = require('jsonwebtoken');

router.post('/signup',function(req,res,next){


    Student.findOne({ email: req.body.email}). then(user =>{
        if(user) {
            res.send(JSON.stringify({message: "User is exists",valid: false}));
        } else {

            Student.create(req.body).then(function(user){
                res.send(JSON.stringify({message: "User reg success",valid: true}));

            });
        }
    });
});

router.post('/login', async (req, res, next) => {
    try {

        const st = await Student.findOne({email: req.body.email}).then((user)=>{


        if(user === null)
        {
           
           res.send(JSON.stringify({message: "User does not exist",isValidLogin: false}));
        }

        else if (user.email === req.body.email && user.password === req.body.password){

            const payload = {
                id: user._id,
                email: user.email,
                role: "student",
              };

              jwt.sign(
                payload,
                "secret",
                {
                  expiresIn: 86400 // 1 day
                },
                (err, token) => {
                  // res.json({
                  //   isValidLogin: true,
                  //   token: "Bearer " + token,
                  //   token1 : token
                  // });
                  res.send(JSON.stringify({message: "User find",isValidLogin: true,token : token ,user}));
                }
              );

        }

        else{

        }


        });


       // res.send(JSON.stringify({message: "item details", item: item}));

        
      } catch (e) {
        
        next(e)
    }
});

//book online course

router.post("/bookCourse/:id", async (req, res) => {  


    try {

        //const student = {email : req.body.email};

        const studentFind = await Student.findOne({_id: req.body.userId});

        if(studentFind === null)
        {

        }
        else{

           const {email} = studentFind;
           const student = {email : email}; 

        console.log(s);

        const item =  await Course.findOneAndUpdate({_id: req.params.id}, {$push: {partcipants: student}}, {new: true});

        //     const {name} = item;

        //     console.log('name',name);

        //     const c = {courseName:name};

        // const response = await Student.findOneAndUpdate({_id:  req.body.userId}, {$push: {courses: c}}, {new: true});


        res.send(JSON.stringify({message:'successfully booked'}));
        }




    } catch (e) {
        console.log(e);
    }

});








module.exports = router;