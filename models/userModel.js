const mongoose=require('mongoose');
const emailValidator=require('email-validator');

// <--------------Linking MongoDB to server---------->
const db_link="mongodb+srv://admin:ghJ8u9PPxH2K5s0a@cluster0.jbvca.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
mongoose.connect(db_link)
.then(function(db){
    console.log("user db connected");
})
.catch(function(err){
    console.log(err);
})


// <-------------Schema Creation----------->
const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,  
        validate:function(){
            return  emailValidator.validate(this.email);
        }
        
    },
    password:{
        type:String,
        required:true
    },
    confirmPassword:{
        type:String,
        required:true,
        validate:function(){
            return this.confirmPassword==this.password
        }
    }
    
});

userModel=mongoose.model('userModel',userSchema);
module.exports=userModel;