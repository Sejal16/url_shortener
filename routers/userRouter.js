const express = require('express');
const app = express();
const path = require('path');
const userRouter = express.Router();
app.use(express.json())
const{signup,login,logout,protectRoute,renderIndex,renderHome}=require("../controller/authController")
const{directShortId, shortUrl}=require("../controller/urlController")

userRouter
.route('/')
.get(renderIndex)

userRouter
.route('/home')
.get(renderHome)

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
.route("/logout")
.get(logout)
userRouter
.route("/:shortid")
.get(directShortId)
module.exports=userRouter

userRouter.use(protectRoute)
userRouter
    .route("/home/:id")
    .post(shortUrl)

