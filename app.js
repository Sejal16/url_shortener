const express = require('express');
const app = express();
const path = require('path');
app.use(express.json())
app.listen(3000,()=>console.log("server satrted"))
const cookieParser = require('cookie-parser')
app.use(cookieParser())

const userModel=require('./models/userModel')
const userRouter=require('./routers/userRouter')
const urlModel=require('./models/urlModel')
const urlRouter=require('./routers/urlRouter')
app.use("/",userRouter);
app.use("/user",urlRouter);


app.use(express.static(path.join(__dirname,'views')))
app.use(express.urlencoded({extended :false}));
app.set('view engine','ejs')
app.get('/',async (req,res,next)=>{
 res.render('index')
})
