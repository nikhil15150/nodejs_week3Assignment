const mongoose=require('mongoose');
const Schema=mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
const currency=mongoose.Types.Currency;
const promotionschema=new Schema({
    name:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    label:{
        type:String,
        required:true
    },
    price:
    {
        type:currency,
        required:true
    },
    description:{
        type:String,
    },
    featured:{
        type:Boolean,
        required:true
    }
},
{
    timestamps:true
}
);

var promotions=mongoose.model('Promotion',promotionschema);
module.exports=promotions;