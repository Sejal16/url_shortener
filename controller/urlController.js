const express=require('express')
const urlModel=require('../models/urlModel')
const userModel=require('../models/userModel')
const shortid=require('shortid')
const validUrl=require('valid-url')

module.exports.shortUrl= async function shortUrl(req,res)
{
// console.log(req.id);
    try{
    // let id=req.id
    // let user= await userModel.findById(id);
    // checking valid user or not
//    if(user)
//    {
     const {longurl}=req.body;
     // checking if we have a url in req or not
     if(longurl){
        const longurlExists= await urlModel.findOne({longurl})
        // if already the url exists
        if(longurlExists)
        {
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
                shortUrl:shortUrl,
                // user:user
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
//    }
//    else{
//     res.json({
//         message:"Invalid ID"
//    })
//     } 
}
catch(err){
res.status(500).json({
    message:err.message
})
}
}