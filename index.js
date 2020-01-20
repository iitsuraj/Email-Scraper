/**

    Doc to use
1. Google String - site:linkedin.com "internship" "india" "@iitbhu.ac.in"
2.fetch('http://localhost:4400/google', {
  method: 'POST',
  body: JSON.stringify({
    body: document.body.innerText
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8'
  }
})
.then(res => res.json())
.then(console.log)
setTimeout(function(){if(document.getElementById('pnnext') === null){alert('reach to end')}else{document.getElementById('pnnext').click()}},1000)
**/

var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var app = express();
var fs = require("fs");
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var emails = [];
function extractEmails(text) {
  return text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi);
}
app.get("/google", (req, res) => {
  var filename = `googleemail${new Date().getTime()}`;
  fs.writeFileSync(`${filename}.txt`, JSON.stringify(emails));
  res.json({ emails: emails });
  emails = [];
});
app.post("/google", (req, res) => {
  var newemails = extractEmails(req.body.body);
  if (newemails !== null) {
    emails = emails.concat(newemails);
  }
  res.json({ newemail: newemails.length, emails: emails.length });
});

var PhoneNumber = [];

app.get("/", (req, res, next) => {
  res.json({ phonenumber: PhoneNumber });
});
function phoneExtract(data) {
  return data.match(/^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/gm);
}
app.post("/", (req, res) => {
  var newPhoneNumber = phoneExtract(req.body.body);
  if (newPhoneNumber !== null) {
    PhoneNumber = PhoneNumber.concat(newPhoneNumber);
  }
  res.json({
    newPhoneNumber: newPhoneNumber.length,
    phonenumber: PhoneNumber.length
  });
});

app.listen(4400, function(err) {
  if (err) throw err;
  console.log("server is running on port 4400");
});
