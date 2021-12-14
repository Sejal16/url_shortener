const express = require('express');
const app = express();
const userRouter = express.Router();

//user signup
userRouter
    .route("/signup")
    .post(signup)

// user login
userRouter
    .route("/login")
    .post(login)

// Forget password
userRouter
.route("/forgetpassword")
.post(forgetpassword)

//reset password
userRouter
.route("/resetpassword/:token")
.post(resetpassword)

// logout 
userRouter
.route("/logout")
.get(logout)

module.exports=userRouter