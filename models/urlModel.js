const mongoose=require('mongoose');

// <-------------Schema Creation----------->
const urlSchema=new mongoose.Schema({
   longurl:{
    type:String,
    required:true
   },
   shortUrl:{
    type:String
   },
   timesClicked:{
    type:Number
   },
   browsers:{
    type:String
   },
   user:{
    type:mongoose.Schema.ObjectId,
    ref:'userModel',
    required:[true,'Url must belong to user'],

}
    
});