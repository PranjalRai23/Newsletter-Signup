 const express = require("express");
 const bodyParser = require("body-parser");
 const request = require("request");
 const https = require("https");

 const app = express();

 app.use(express.static("public"));
 app.use(bodyParser.urlencoded({extended: true}));

 app.get("/",function(req,res){
   res.sendFile(__dirname + "/signup.html");
 });

 app.post("/", function(req,res){

   const fName = req.body.fname;
   const lName = req.body.lname;
   const email = req.body.email;

   console.log(fName, lName, email);

   const data = {
     members: [
       {
         email_address: email,
         status: "subscribed",
         merge_fields: {
           FNAME: fName,
           LNAME: lName
         }
       }
     ]
   }

   const jsonData = JSON.stringify(data);

   const url = "https://us21.api.mailchimp.com/3.0/lists/a7391e0ac0";

   const options = {
     method: "POST",
     auth: "pranjal:540ad33ba6737f7b3322c20264288a49-us21"
   }

   const request = https.request(url, options, function(response){

     if(response.statusCode == 200){
       res.sendFile(__dirname + "/success.html");
     } else{
       res.sendFile(__dirname + "/failure.html");
     }

     response.on("data", function(data){
       console.log(JSON.parse(data));
     })
   })

   request.write(jsonData);
   request.end();

 });

 app.post("/failure", function(req,res){
   res.redirect("/");
 });

 app.listen(process.env.PORT || 3000, function(){
   console.log("Server is running on port 3000");
 });

//453f1ed867d78c023ffeafa97e04da7d-us21
//a7391e0ac0
//540ad33ba6737f7b3322c20264288a49-us21
