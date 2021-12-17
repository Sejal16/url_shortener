const express = require('express');
const app = express();
const urlRouter = express.Router();
const{protectRoute}=require("../controller/authController");
const { shortUrl } = require('../controller/urlController');



//url Shortening
urlRouter.use(protectRoute)
urlRouter
    .route("/shortUrl/:id")
    .post(shortUrl)


module.exports=urlRouter;