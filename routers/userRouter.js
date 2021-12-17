const express = require('express');
const app = express();
const path = require('path');
const userRouter = express.Router();
app.use(express.json())
const{signup,login,logout}=require("../controller/authController")
const{directShortId}=require("../controller/urlController")



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

userRouter
.route("/:shortid")
.get(directShortId)
module.exports=userRouter

