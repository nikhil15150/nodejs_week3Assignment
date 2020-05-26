var mongoose=require('mongoose');
const Schema=mongoose.Schema;
passportlocalmongoose=require('passport-local-mongoose');

var userSchema= new Schema({
    admin:{
        type:Boolean,
        default:false
    }
},
{
    timestamps:true
}
);
userSchema.plugin(passportlocalmongoose);
var users=mongoose.model('User',userSchema);
module.exports=users;
