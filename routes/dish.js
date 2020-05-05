var express = require('express');
var router = express.Router();
const Dishes=require('../models/dishes');

///////////////////For http://localhost:3000/dishes/ endpoint
router.route('/')
.get((req,res,next)=>{
  //return all the dishes present using model and mongodb
  Dishes.find({})
  .then((dish)=>{
      console.log("Dishes Retrieved successfully");
      res.statusCode=200;
      res.setHeader('Content-Type','Application/json');
      res.json(dish);
  })
  .catch((err)=>{
      next(err);    
  })
})
.post((req,res,next)=>{
  //Add a dish using model schema and mongodb module
  Dishes.create(req.body)
  .then((dish)=>{
      console.log("Dish Created Successfully");
      res.statusCode=200;
      res.setHeader('Content-Type','Application/json'),
      res.json(dish);
  })
  .catch((err)=>{
      next(err);
  })

})
.put((req,res,next)=>{
    //As we cannot update a dish at this end point so return an error
    res.statusCode=403;
    res.setHeader('Content-Type','Application/json');
    res.send('PUT is not a valid method for this end point');
    res.end();
})
.delete((req,res,next)=>{
    //delete all the dishes  here
    Dishes.remove({})
    .then((dish)=>{
        console.log("removed all dishes successfully");
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(dish);
    })
    .catch((err)=>{
        next(err);
    })
});





///////////////////For  http://localhost:3000/dishes/:dishid/ endpoint
router.route('/:dishid')
.get((req,res,next)=>{
  //return  the dishes present  if present using dishid ,model and mongodb
  Dishes.findById(req.params.dishid)    
  .then((dish)=>{
      console.log("Dish Founded");
      res.statusCode=200;
      res.setHeader('Content-Type','Application/json');
      res.json(dish);
  })
  .catch((err)=>{
      next(err);
  })
})
.post((req,res,next)=>{
  //Cannnot add a dish  at this end point  
  res.statusCode=403;
  res.setHeader('Content-Type','Application/json');
  res.end("POST opertoin is not valid at this end point"); 
})
.put((req,res,next)=>{
    //update the particular dish using dish id 
    Dishes.findByIdAndUpdate(req.params.dishid,{
        $set:req.body   
     },{new:true})
     .then((dish)=>{
         console.log("Dish info updated successfully");
         res.statusCode=200;
         res.setHeader('Content-Type','Application/json');
         res.json(dish);
     })
     .catch((err)=>{
         next(err);
     })
})
.delete((req,res,next)=>{
    //delete particular dish    
    Dishes.findByIdAndDelete(req.params.dishid)
    .then((dish)=>{
        console.log("Dish removed successfully");
        res.statusCode=200;
        res.setHeader('Content-Type','Application/json');
        res.json(dish);
    })
    .catch((err)=>{
        next(err);
    })

});


////////////////// For http://localhost:3000/dishes/:dishid/comments endpoint 
router.route('/:dishid/comments')
.get((req,res,next)=>{
  //return  all the comments
  Dishes.findById(req.params.dishid)
  .then((dish)=>{
      if(dish)
      {
          console.log("dish exist and now lokking for comments");
          res.statusCode=200;
          res.setHeader('Content-Type','Application/json');
          res.json(dish.comments);
      }
      else{
          console.log("dish doesnot exist");
          err=new Error(`Required Dish ${req.params.dishid} does not exist `);
          err.statusCode=404;
        next(err);
      }
  })
  .catch((err)=>{
      next(err);
  })
})
.post((req,res,next)=>{
  //add a commnet   
  Dishes.findById(req.params.dishid)
  .then((dish)=>{
      if(dish!=null)
      {
          dish.comments.push(req.body);
          dish.save()
          .then((dish)=>{
              console.log("New comment added successfully");
              res.statusCode=200;
              res.setHeader('Content-Type','application/json');
              res.json(dish.comments);
          })
          .catch((err)=>{
              next(err);
          }

          )

      }
      else{
          err=new Error('Dish '+ req.param.id +" not found");
          err.statusCode=404;
          return(next(err));
      }

  })
  .catch((err)=>{
      next(err);
  })
})
.put((req,res,next)=>{
   res.statusCode=403;
   res.setHeader('Content-Type','application/json');
   res.end(`Put operation not supported on /dishes/'+${req.params.dishid}+'/comments`);
})
.delete((req,res,next)=>{
    //delete allcomments 
    Dishes.findById(req.params.dishid)
    .then((dish)=>{
        if(dish!=null)
        {
            for(var i=dish.comments.length-1;i>=0;i--)
            {
                dish.comments.id(dish.comments[i]._id).remove();
            }
            dish.save()
            .then((dish)=>{
                res.statusCode=200;
                res.setHeader('Content-Type','application/json');
                res.json(dish);
            })
            .catch((err)=>{
                next(err);
            })
        }
        else{
            err=new Error('Dish '+ req.param.dishid +" not found");
          err.statusCode=404;
          return(next(err));
        }

    })  
    .catch((err)=>{
        next(err);
    })

});

////////////////////For http://localhost:3000/dishes/:dishid/comments/:commentid/ endpoint
router.route('/:dishid/comments')
.get((req,res,next)=>{
  //Get a particular comment with comment id 
})
.post((req,res,next)=>{
  //not possible to add a comment at this end point  
})
.put((req,res,next)=>{
    //Update a particular comment using this end point 
})
.delete((req,res,next)=>{
    //delete a particular comment 

});
module.exports = router;
