Shrinker --> 
 A Url Shortner Service which takes a long url as an input and returns a Shorturl and has a features of recording the Number of Clicks on Short Url and on what browsers the Short Link was used
 
TechStack Used -->
This Application works along with Nodejs,Express,MongoDB as Backend and Html,CSS,Javascript and Bootstarp on Front-End.

How to Run -->
Installing the dependencies
  1.Intialize with npm init which insatll the basic node modules 
  
  2.Installing express for framework and MongoDB for Database with the command <-- npm install express mongoose -->
  
  3.Installing Shortid package for Generating Shorturls with the command <-- npm insatll shortid -->
  
  4.Insatlling a Package which tells the Browsers Used while clicking on the  Shorturl <-- npm install device-detector-js -->
  
  5.Installing ejs package for generating web pages that can include dynamic data using command <-- npm insatll ejs -->
  
  6.Installing other packages for validating-url <-- npm i valid-url deep-email-validator email-validator -->
  
  7.For safe means of Information exchange between clients and server installing jsonwebtoken by <-- npm i jsonwebtoken -->
  
  8.For encyrpting passwords <-- npm i bycrpt -->
  
  9.For Parsing cookies <-- npm i cookie-parser -->
  
  10.In this application we are using nodemailer for sending mails to clients <-- npm i nodemailer -->
  
  11.Now for Development Purpose Insatlling Nodemon which automatically restarts server whenever we save changes <-- npm i -D nodemon -->
  
After Installing the Basic Dependicies, write in package.json under scripts <-- "start" : nodemon app.js" --> this will make sure that nodemon will be started after using command <-- npm start -->

Now to Get the Application Started run a Command on Terminal <-- npm start --> this will start a local server on port 3000

For viewing the Web App Open the Browser and go to "localhost:3000" This will redirect to the Login/Signup Page of the Website

After Signing up, the user will be redirected to the home page where one can shrink the long url

Underneath that a Table is kept for the user History work which tells the Number of Clicks and on What Browser the link was used on.

After using, the user can logout using the logout button on upper right corner ..

<-- Happy Shrinking!! -->


  
  
  


