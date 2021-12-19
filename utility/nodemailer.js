const nodemailer = require("nodemailer");


module.exports.sendMail=async function sendMail(str,data){
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "sejal.august16@gmail.com", // generated ethereal user
        pass: "xpwwpabphzoftjey", // generated ethereal password
      },
    });
  
  
  var Osubject,Otext,Ohtml;
  if(str=="signup")
  {
  Osubject=`ThankYou for signing ${data.name}`
  Ohtml=`
  <h1>Welecome to Shrinker</h1>
  <p> Shrinker is a URL shortening service and a link management platform.</p>
  <p> Use our tool to shorten links and then share them, in addition you can monitor traffic statistics</p>
  <br>
  Here are your details:
  <br>
  <p>Name- ${data.name}</p>
  <p>Email- ${data.email}</p>
  `
  }
  else if(str=="resetpassword")
  {
      Osubject=`Reset Password`;
      Ohtml=`
      <h1> Welecome to Shrinker</h1>
     <p> Here is the link to reset your password</p>
      ${data.resetPasswordLink}`
  
  
  }
  
  
    let info = await transporter.sendMail({
      from: '"Shrinker" <sejal.august16@gmail.com>', // sender address
      to: data.email, // list of receivers
      subject: Osubject, // Subject line
      text: Otext, // plain text body
      html: Ohtml, // html body
    });
  
    console.log("Message sent: %s", info.messageId);
  
  }
  