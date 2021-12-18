const express = require('express');
const app = express();
const path = require('path');
const userRouter = express.Router();
app.use(express.json())
const{signup,login,logout,protectRoute,renderIndex,renderUser}=require("../controller/authController")
const{directShortId, shortUrl,urlInfo}=require("../controller/urlController")

//render the index.js file or the home file
userRouter
.route('/')
.get(renderIndex)

//render the user  page
userRouter
.route('/user')
.get(renderUser)


userRouter
.route("/:shortid")
.get(directShortId)

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


userRouter
.route("/logout")
.get(logout)

userRouter
.route("/user/:id")
.get(urlInfo)






userRouter.use(protectRoute)
userRouter
    .route("/shortUrl")
    .post(shortUrl)

module.exports=userRouter