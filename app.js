const express = require('express');
const app = express();
app.use(express.json({extended:false}))
app.listen(3000,()=>console.log("server satrted"))

const userModel=require('./models/userModel')
const userRouter=require('./routers/userRouter')
const urlModel=require('./models/urlModel')
const urlRouter=require('./routers/urlRouter')
app.use("/",userRouter);
app.use("/user",urlRouter);