const express = require('express');
const router = express.Router();


const Travel = require('../models/Package');

router.get('/get',async (req,res,next)=>{

   console.log('get');

   res.json('get');
    
});



router.post('/addPackage',async (req,res,next)=>{

    console.log(req.body);
    try{
        const response = await Travel.create(req.body);
    
      res.send(JSON.stringify({success:"Travel Package added", res : response} ));
      }
      catch(e){
        console.log(e);
      }
    
});




router.patch('/updatePackage/:id',async (req,res,next)=>{

    console.log(req.body);
  
   try{
     
    const updatePackage = await Travel.updateOne(
  {"_id" :req.params.id},
    {
      $set: {"city":req.body.city,"destination" :req.body.destination,
    
      "distance" : req.body.distance,"price":req.body.price}
    }
  
  );
  
     res.json(updatePackage);
  
  
      
    }
    catch(e){
      console.log(e);
    }
  
});


router.delete('/deletePackage/:id',async (req,res,next)=>{

    try{
    
      const response = await Travel.deleteOne({"_id" : req.params.id });
    
      res.json(response);
    
    }
    catch(e){
      console.log(e);
    }
    
    });
    
router.get('/getAllPackages',async (req,res,next)=>{
    
      try{
      
        const response = await Travel.find();
      
        res.json(response);
      
      }
      catch(e){
        console.log(e);
      }
      
      });
  
  

module.exports = router;