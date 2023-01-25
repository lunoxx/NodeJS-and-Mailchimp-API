
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const client = require("@mailchimp/mailchimp_marketing");
client.setConfig({
    apiKey: "29dcc77d9431925044a96f05209fe2f9",
    server: "us21",
});


const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({
    extended: true
}))

// 

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req, res) {

    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var email = req.body.emailAdress;

    const addListMember = async () => {

        try {
            const response = await client.lists.addListMember("b42cc8bd0b", {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            });
            res.sendFile(__dirname + "/success.html");

        }
        catch (err) {
            // if(err.status == 400) {
            //     console.log(JSON.parse(err.response.text));
            //     res.status(400).send(err);
            // }
            res.sendFile(__dirname + "/failure.html");
        }
    };

    addListMember();
});

app.post("/home", function(req, res) {
    res.redirect("/");
});

app.listen(3000, function() {
    console.log("Server is running on port 3000.");
})

// API KEY:
// 29dcc77d9431925044a96f05209fe2f9-us21

// List ID: 
// b42cc8bd0b