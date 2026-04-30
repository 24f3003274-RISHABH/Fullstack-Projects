const mongoose =require('mongoose');

const userSchema=new mongoose.Schema({
  username :{
    type:String,
    required:true,
    trim:true,
    minlength:3,
    lowercase:true,
    // unique:true
  },
  email:{
    type:String,
    required:true,
    trim:true,
    minlength:[13,'Email must be atleast 13 characters long'],
    lowercase:true,
    // unique:true


  },
  password:{
    type:String,
    required:true,
    trim:true,
    minlength:[5,'Password must be atleast 5 characters long'],
  },
})

const userModel=mongoose.model('user',userSchema)

module.exports=userModel