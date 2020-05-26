var mongoose=require('mongoose');
const Schema=mongoose.Schema;

var userSchema= new Schema({
    username:{
        type:String,
        require:true,
        unique:true
    },
    password:
    {
        type:String,
        require:true
    },
    admin:{
        type:Boolean,
        default:false
    }
},
{
    timestamps:true
}
)
var users=mongoose.model('User',userSchema);
module.exports=users;
