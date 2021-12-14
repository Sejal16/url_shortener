const mongoose=require('mongoose');
const emailValidator=require('email-validator');


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
    repeatPassword:{
        type:String,
        required:true,
        validate:function(){
            return this.repeatPassword==this.password
        }
    }
    
});