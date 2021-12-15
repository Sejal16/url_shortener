const express = require('express');
const app = express();
const userRouter = express.Router();
const{signup,login,logout}=require("../controller/authController")
//user signup
userRouter
    .route("/signup")
    .post(signup)

// user login
userRouter
    .route("/login")
    .post(login)

userRouter
.route("/logout")
.get(logout)
// // Forget password
// userRouter
// .route("/forgetpassword")
// .post(forgetpassword)

// //reset password
// userRouter
// .route("/resetpassword/:token")
// .post(resetpassword)

// // logout 
// userRouter
// .route("/logout")
// .get(logout)

module.exports=userRouter