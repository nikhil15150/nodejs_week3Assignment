const Leaders=require('../models/leaders');
const express= require('express');
const router=express.Router();
const authenticate=require('../authenticate');

//////////////End points for http://localhost:3000/leaders
router.route('/')
.get((req,res,next)=>{
    //return all the leaders
    Leaders.find({})
    .then((leader)=>{
        if(leader!==null)
        {
            console.log("Received leaders");
            res.statusCode=200;
            res.setHeader('Content-Type','application/json');
            res.json(leader);
        }
    })
    .catch((err)=>{
        next(err);
    })
})
.post(authenticate.verifyUser,(req,res,next)=>{
    //add new leaders
    Leaders.create(req.body)
    .then((leader)=>{
        console.log("Leader created successfully");
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(leader);
    })
    .catch((err)=>{
        next(err);
    })

})
.put(authenticate.verifyUser,(req,res,next)=>{
    res.statusCode=403;
    res.setHeader('Content-Type','application/json');
    res.end("PUT operation not supported at http://localhost/leaders/");
//update a leader
    
})
.delete(authenticate.verifyUser,(req,res,next)=>{
///delete all leaders
    Leaders.remove({})
    .then((leader)=>{
        console.log("All leaders removed");
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(leader);
    })
    .catch((err)=>{
        next(err);
    })

})


//////////////For endpoints for https://localhost:3000/leaders/:leaderid
router.route('/:leaderid')
.get((req,res,next)=>{

    ///get a particular leader
    Leaders.findById(req.params.leaderid)
    .then((leader)=>{
        console.log("Specific leader founded");
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(leader); 
    })
    .catch((err)=>{
        next(err);
    });
})
.post(authenticate.verifyUser,(req,res,next)=>{
 ///add a leader
 res.statusCode=403;
 res.setHeader('Content-Type','application/json');
 res.end("POST is not supported on this endpoint i.e http://localhost:3000/leaders/:leaderid")

})
.put(authenticate.verifyUser,(req,res,next)=>{
///updated a particular leaders
    Leaders.findByIdAndUpdate(req.params.leaderid,{$set:req.body},{$new:true})
    .then((leader)=>{
        console.log("Specific leader Updated");
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(leader); 
    })
    .catch((err)=>{
        next(err);
    });
})
.delete(authenticate.verifyUser,(req,res,next)=>{
////delete a particular leaders
        Leaders.findByIdAndRemove(req.params.leaderid)
        .then((leader)=>{
            console.log("Specific leader deleted");
            res.statusCode=200;
            res.setHeader('Content-Type','application/json');
            res.json(leader); 
        })
        .catch((err)=>{
            next(err);
        });
})

module.exports=router;

