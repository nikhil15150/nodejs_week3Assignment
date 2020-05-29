const mongoose=require('mongoose');
const Schema=mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
const currency=mongoose.Types.Currency;
const commentschema=new Schema({
    rating:{
        type:Number,
        min:1,
        max:5,
        required:true
    },
    comment:{
        type:String,
        required:true
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
    
},
{
    timestamp:true
});
const dishSchema=new Schema({
    name:{
        type:String,
        required:true,    
    },
    image:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true
    },
    price:{
        type:currency,
        required:true
    },
    label:{
        type:String,
        required:true
    },
    featured:{
        type:Boolean,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    comments:[commentschema]
    
},
{
    timestamp:true
});

var dishes=mongoose.model('Dish',dishSchema);
module.exports=dishes;