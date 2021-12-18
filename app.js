const express = require('express');
const app = express();
const path = require('path');
app.use(express.json())
app.listen(3000,()=>console.log("server satrted"))

const userModel=require('./models/userModel')
const urlModel=require('./models/urlModel')
const userRouter=require('./routers/userRouter')
const cookieParser = require('cookie-parser')


app.use(cookieParser())
app.use(express.static(path.join(__dirname,'views')))

app.use(express.urlencoded({extended :false}));
app.set('view engine','ejs')




app.get('/',async (req,res,next)=>{
    res.render('index')
   })

  
   app.get('/home',async (req,res,next)=>{
    res.render('home')
})
app.use("/",userRouter);