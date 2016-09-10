/*var http = require('http');
var fs = require('fs');
var server = http.createServer(function(res, res){
    displayApp(res);
});

function displayApp(res){
    fs.readFile('index.html', function(err, data){
        res.writeHead(200, {
            'Content-Type': 'text/html',
                'Content-Length': data.length
        });
        res.write(data);
        res.end();
    });
}

server.listen(8080);
console.log("server lsitening on 1185");
*/

var express = require("express");
var bodyParser = require("body-parser");
var fs= require("fs");
var util = require("util");
var app = express();

app.use(express.static(__dirname + "/public"));

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(app.router);

app.get('/', function(req, res){
    res.sendfile("index.html");
});

app.post('/form', function(req, res){
    var username =  req.body.username;
    var mailid = req.body.mail;
    var linkedin = req.body.linkedin;
    var submission = req.body.submission;
    var user_obj = {
        Name: username,
        MailId: mailid,
        Profile: linkedin,
        Submission: submission
    }
    writejson(user_obj);
    console.log(user_obj);
    var html = "<h2 style='text-align: center; padding-top: 120px'>Thank you for your submission!</h2>";
    res.send(html);
});

function writejson(obj)
{
    fs.appendFile('./data.json', util.inspect(obj) , 'utf-8');
}
app.listen(process.env.port || 3000);