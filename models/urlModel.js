const mongoose=require('mongoose');
require('dotenv').config({ path: './data.env' });
// <--------------Linking MongoDB to server---------->

mongoose.connect(process.env.DB_URL)
.then(function(db){
    console.log("url db connected");
})
.catch(function(err){
    console.log(err);
})

// <-------------Schema Creation----------->
const urlSchema=new mongoose.Schema({
   longurl:{
    type:String,
    required:true
   },
   shortid:{
    type:String,
    
   },
   shortUrl:{
    type:String,
    
   },
   timesClicked:{
    type:Number,
    default : 0  
   },
   browsers:{
   type:[]

   },
   createdAt:{
    type:Date,
    default:Date.now()
},
   user:{
    type:mongoose.Schema.ObjectId,
    ref:'userModel',
    required:[true,'Url must belong to user'],

}
    
});


urlModel=mongoose.model('urlModel',urlSchema);
module.exports=urlModel;

