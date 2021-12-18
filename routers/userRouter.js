const express = require('express');
const app = express();
const path = require('path');
const userRouter = express.Router();
app.use(express.json())
const{signup,login,logout,protectRoute}=require("../controller/authController")
const{directShortId, shortUrl}=require("../controller/urlController")



  
//user signup
userRouter
    .route("/signup")
    .post(signup)

// user login
userRouter
    .route("/login")
    .post(login)


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

userRouter.use(protectRoute)
userRouter
    .route("/home/:id")
    .post(shortUrl)

userRouter
.route("/logout")
.get(logout)