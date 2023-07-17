const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const axios = require('axios');

const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true}));

app.post("/", function(req, res){
    const firstName = req.body.fName;
    const lastName = req.body.lName
    const email = req.body.email

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    }

    const jsonData = JSON.stringify(data);

    const url = "https://us9.api.mailchimp.com/3.0/lists/b72eedb43e";

    const options = {
        method: "POST",
        auth: "angela1:d0d9a31d7be53b0a25c5233590ebdfe1-us9"
    }

    const request = https.request(url, options, function(response){

        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/failure.html"); 
        } else {
            res.sendFile(__dirname + "/failure.html");
        }

        response.on("data", function(data){
            console.log(JSON.parse(data));
        })

    })

    request.write(jsonData);
    request.end();
    
});

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html")
});

app.post("/failure", function(req, res){
    res.redirect("/")
})


app.listen(3000, function() {
    console.log("Server is running on port 3000.");
})

//API Key
// d0d9a31d7be53b0a25c5233590ebdfe1-us9

//List Id
// b72eedb43e