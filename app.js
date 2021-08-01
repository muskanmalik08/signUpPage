const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
  const firstName = req.body.fname;
  const lastName = req.body.lname;
  const email = req.body.email;

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
  };

var jsonData = JSON.stringify(data);

const url = "https://us6.api.mailchimp.com/3.0/lists/f44b06dc1f"

const options = {
  method: "POST",
  auth: "sayan:f217d55cecb81f5bba09748cad82d9d8-us6"
}

  const request = https.request(url, options, function(response){

if (response.status === 200) {
  alert("You have been subscribed!");
} else {
  alert("An error occured. Try again.");
}

    response.on("data", function(data){
      console.log(JSON.parse(data));
    })

  })
request.write(jsonData);
request.end();

});

app.post("/failure", function(req, res){
  res.redirect("/");
})

app.listen(process.env.PORT || 3000, function(req, res){
  console.log("server is running on port 3000!");
});