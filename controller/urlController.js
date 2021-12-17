const express=require('express')
const urlModel=require('../models/urlModel')
const userModel=require('../models/userModel')
const shortid=require('shortid')
const validUrl=require('valid-url')

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
        console.log(client);
        await result.save()
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