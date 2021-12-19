const express=require('express')
const urlModel=require('../models/urlModel')
const userModel=require('../models/userModel')
const shortid=require('shortid')
const validUrl=require("valid-url")
const DeviceDetector = require("device-detector-js");

module.exports.shortUrl= async function shortUrl(req,res)
{

    try{
    let id=req.cookies.userID;

    let user= await userModel.findById(id);
    // checking valid user or not
   if(user)
   {
     const {longUrl}=req.body;
     // checking if we have a url in req or not
     if(longUrl){
        const longUrlExists= await urlModel.findOne({longUrl})
        // if already the url exists
        if(longUrlExists && longUrlExists.user===id)
        {
                // console.log(longUrlExists.user);
            res.json({
                message:"shorturl already exists",
                url:longUrlExists.shortUrl
            })
        }
        else{
            const baseUrl='http://localhost:3000';
            if(!validUrl.isUri(baseUrl) ||  !validUrl.isUri(longUrl))
            {
                res.status(401).json('Invalid url')
            }
            else{
            const urlCode=shortid.generate();
            const shortUrl=baseUrl+'/'+urlCode;
            let newUrl= new urlModel({
                longurl:longUrl,
                shortid:urlCode,
                shortUrl:shortUrl,
                user:user
            })
            await newUrl.save()
            res.cookie('newShortUrl',newUrl.shortUrl,{httpOnly:true})
            res.redirect("/user/"+req.cookies.userID)
            // res.json({
            //     message:"successfully created",
            //     data:newUrl
            // })
        }

        }
     } 
     else{
         res.json({
             message:"url not found"
         })
     }
   }
   else{
    res.json({
        message:"Invalid ID"
   })
    } 
}
catch(err){
res.status(500).json({
    message:err.message
})
}

}

module.exports.directShortId= async function directShortId(req,res){
    try{
    const {shortid}=req.params
    //  console.log("shortid:  "+shortid);
    let result=await urlModel.findOne({shortid:shortid})
    const{longurl,timesClicked,browsers}=result
    
    if(result){

        result.timesClicked+=1;
        // add browser
        const client=req.get('User-Agent');
        const deviceDetector = new DeviceDetector();
        const device = deviceDetector.parse(client)
        const brow= device.client.name;
        
        let check=false;
        for(let i=0; i<result.browsers.length;i++)
        {
            if(result.browsers[i]===brow)
            {
                check=true;
                break;
            }
        }
        if(!check)
        result.browsers.push(`${brow}`)
        await result.save()
    
         res.redirect(longurl)
        // console.log("everting is working");
 }
 else{
    res.json({
        message:"not a valid url"
    })
 }
}
catch(err)
{
    res.status(501).json({
        message:err.message
    })
}
}

module.exports.urlInfo=async function urlInfo(req,res){
    let urlExp=[]
   
    try{
       
        let userid=req.params.id;
        // let user=await userModel.findById(userid);
        let urls=await urlModel.find();
        // console.log(userid);
       
       urls=urls.filter(url=> url.user._id == userid)
    //    console.log("urls",urls)
        if(urls)
        {
            urlExp=urls
            // return res.json({
            //     message:"url retrieved",
            //     data:urls
            // });
        }
        else{
            res.json({
                message:"no url formed"
            })
        }
    }
    catch(err)
    {
        res.status(500).json({
            message:err.message
        });
    }
    res.render('user',{userName:req.cookies.userName,urls:urlExp,newShortUrl:req.cookies.newShortUrl})
}
    
