const mongoose=require('mongoose');
const bcrypt = require('bcrypt');
const crypto=require('crypto')
require('dotenv').config({ path: './data.env' });
// <--------------Linking MongoDB to server---------->

mongoose.connect(process.env.DB_URL)
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
    },
    resetToken:{
        type:String, 
        default:"" 
    }
    
});

userSchema.pre('save', async function(){
    let salt=await bcrypt.genSalt();
    let hashpassword= await bcrypt.hash(this.password,salt);
    // console.log(hashpassword);
    this.password=hashpassword; 
    this.confirmPassword=hashpassword;
})
// userSchema.methods.createResetToken= function(){
//     // to create a unique 32bit token we use the npm module crypto
//     const resetToken=crypto.randomBytes(32).toString("hex");
//     this.resetToken=resetToken;
//     return resetToken;
// }

userSchema.methods.resetPasswordHandler= function(password,confirmPassword){
this.password=password;
this.confirmPassword=confirmPassword;
}
userModel=mongoose.model('userModel',userSchema);
module.exports=userModel;