const express=require('express')
const urlModel=require('../models/urlModel')
const userModel=require('../models/userModel')
const shortid=require('shortid')
const validUrl=require("valid-url")
const DeviceDetector = require("device-detector-js");
module.exports.shortUrl= async function shortUrl(req,res)
{

    try{
    let id=req.id
    let user= await userModel.findById(id);
    // checking valid user or not
   if(user)
   {
     const {longurl}=req.body;
     // checking if we have a url in req or not
     if(longurl){
        const longurlExists= await urlModel.findOne({longurl})
        // if already the url exists
        if(longurlExists && longurlExists.user===id)
        {
                console.log(longurlExists.user);
            res.json({
                message:"shorturl already exists",
                url:longurlExists.shortUrl
            })
        }
        else{
            const baseUrl='http://localhost:3000';
            if(!validUrl.isUri(baseUrl) ||  !validUrl.isUri(longurl))
            {
                res.status(401).json('Invalid url')
            }
            else{
            const urlCode=shortid.generate();
            const shortUrl=baseUrl+'/'+urlCode;
            let newUrl= new urlModel({
                longurl:longurl,
                shortid:urlCode,
                shortUrl:shortUrl,
                browsers:new Map,
                user:user
            })
            await newUrl.save()
            res.json({
                message:"successfully created",
                data:newUrl
            })
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
    const result=await urlModel.findOne({shortid})
    if(!result)
    {
        res.status(501).json({
            message:"not a valid url"
        })
    }
    else{
        result.timesClicked+=1;
        // add browser
        const client=req.get('User-Agent');
        const deviceDetector = new DeviceDetector();
        const device = deviceDetector.parse(client)
        const brow= device.client.name;
        
    //   console.log(result.browsers.hasOwnProperty(brow));
    // console.log( Object.keys(result.browsers));
    // console.log(result.browsers[`${brow}`]);
    //     if(result.browsers[`${brow}`]!=undefined){
    //     let val=result.browsers[`${brow}`];
    //         val+=1;
    //     console.log(val);
    //     // result.browsers.set(brow,parseInt(1))
    //     console.log(result.browsers);
    // }
    //     else {
        // console.log("`${brow}`");
        // let obj={`${brow}`:"1"}
        // Object.assign(result.browsers,obj);
            // result.browsers["`${brow}`"]=1
        // result.browsers={...result.browsers,`${brow}:${val}`}
        // result.browsers.push({$brow:1});
        // }
        // result.browsers.set(brow,1);
        // console.log(result.browsers.includes["Chrome"]);
        // if(result.browsers.includes["Chrome"]==false)

        let check=false;
        for(let i=0;i<result.browsers.length;i++)
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
        console.log("final",result.browsers);
        res.redirect(result.longurl)
    }
}
catch(err)
{
    res.status(501).json({
        message:"not a valid url"
    })
}
}