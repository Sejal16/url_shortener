const mongoose=require('mongoose');
const bcrypt = require('bcrypt');
const crypto=require('crypto')

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
    resetToken:String
    
});

userSchema.pre('save', async function(){
    let salt=await bcrypt.genSalt();
    let hashpassword= await bcrypt.hash(this.password,salt);
    // console.log(hashpassword);
    this.password=hashpassword; 
    this.confirmpassword=hashpassword
})
userSchema.methods.createResetToken= function(){
    // to create a unique 32bit token we use the npm module crypto
    const resetToken=crypto.randomBytes(32).toString("hex");
    this.resetToken=resetToken;
    return resetToken;
}

userSchema.methods.resetPasswordHandler= function(password,confirmPassword){
this.password=password;
this.confirmPassword=confirmPassword;
}
userModel=mongoose.model('userModel',userSchema);
module.exports=userModel;