const Promotions=require('../models/promotions');
const express=require('express');
const router=express.Router();


/////////////For endpoints http://localhost:3000/promotions
router.route('/')
.get((req,res,next)=>{
    ////////////return all the promotions
    console.log("get all promotions");
    Promotions.find({})
    .then((promos)=>{
        if(promos!==null)
        {
            console.log("received all the promotion");
            res.statuscode=200;
            res.setHeader('Content-Type','application/json');
            res.json(promos);
        }
    })
    .catch((err)=>{
        next(err);
    })

})
.post((req,res,next)=>{
    //add a new promotions  
    Promotions.create(req.body)
    .then((promo)=>{
        console.log("inserted promotion successfully");
        res.statuscode=200;
        res.setHeader('Content-Type','application/json');
        res.json(promo);
    })
    .catch((err)=>{
        next(err);
    })
})
.put((req,res,next)=>{
    //update a promotion
    res.statuscode=403;
    res.setHeader('Content-Type','application/json');
    res.end(`PUT operation is not supported on https://localhost:3000/promotions`);
})
.delete((req,res,next)=>{
    //delete all promotion
    Promotions.remove({})
    .then((promos)=>{
        console.log("deleting all the promotions");
        res.statuscode=200;
        res.setHeader('Content-Type','application/json');
        res.json(promos);
    })
    .catch((err)=>{
        next(err);
    })
})


///////////////////for end points http://localhost:3000/promotions/:promoid

router.route('/:promoid')
.get((req,res,next)=>{
    ///////return the specific promotion
    Promotions.findById(req.params.promoid)
    .then((promo)=>{
        console.log("Promotion founded");
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(promo);
    })
    .catch((err)=>
    {
        next(err);
    })

})
.post((req,res,next)=>{
    //add a new promotion  
   res.statuscode=403;
   res.setHeader('Content-Type','application/json');
   res.end(`POST Method is not applicable at http:\\\\localhost:3000\\promotions\\promoid`) ;

})
.put((req,res,next)=>{
    //update a promotion with the given id
    Promotions.findByIdAndUpdate(req.params.promoid,{$set:req.body},{$new:true})
    .then((promo)=>{
        console.log("Promotion updated successfully");
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(promo);
    })
    .catch((err)=>{
        next(err);
    })
})
.delete((req,res,next)=>{ 
    //delete a specific promotion
    Promotions.findByIdAndRemove(req.params.promoid)
    .then((promo)=>{
        console.log("promotion removed successfully");
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(promo);
    })
    .catch((err)=>{     
        next(err);
    })
})
module.exports=router;