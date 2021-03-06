var file = require('file-system');
var fs = require('fs');

//var http = require('http');
var serveIndex = require('serve-index');
var path = require('path');

var express = require('express')
var app = express();
var bodyParser = require('body-parser')

//write the first row (the column titles)
firstRow="ip_address, die_version, session_id, time, die_outcome, round";
writeDataToFile(firstRow);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


//app.use("/", serveIndex("public"));
app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/87w6ra', function(req, res){
  res.sendFile(__dirname + '/public/87w6ra.html');
});

app.get('/87w6rb', function(req, res){
  res.sendFile(__dirname + '/public/87w6rb.html');
});

app.get('/87w6rc', function(req, res){
  res.sendFile(__dirname + '/public/87w6rc.html');
});

app.get('/87w6rd', function(req, res){
  res.sendFile(__dirname + '/public/87w6rd.html');
});

app.get('/87w6re', function(req, res){
  res.sendFile(__dirname + '/public/87w6re.html');
});

app.get('/87w6rf', function(req, res){
  res.sendFile(__dirname + '/public/87w6rf.html');
});

app.get('/87w6rg', function(req, res){
  res.sendFile(__dirname + '/public/87w6rg.html');
});

app.get('/87w6rh', function(req, res){
  res.sendFile(__dirname + '/public/87w6rh.html');
});

app.get('/87w6ri', function(req, res){
  res.sendFile(__dirname + '/public/87w6ri.html');
});

app.get('/87w6rj', function(req, res){
  res.sendFile(__dirname + '/public/87w6rj.html');
});

app.get('/data', function(req, res){
  res.sendFile(__dirname + '/public/data.txt');
});

app.use(express.static(path.join(__dirname, 'public')));


app.get('/sendDataToBackend', function(req, res) {
    console.log("In the backend");
    //console.log(res);
    //console.log(req._parsedOriginalUrl.query);
    var tempJson = req._parsedOriginalUrl.query;
    var json = replaceAll(tempJson, '%22', '"');
    json = replaceAll(json, "%20", " ");
    console.log(json);
    writeDataToFile(json, false);
    //console.log("Backend: "+JSON.stringify(req.body));
})

function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
}

var stream = fs.createWriteStream("data.txt");

function writeDataToFile(data) {
    fs.appendFile(path.join(__dirname, 'public/')+ 'data.txt', data + "\n", function(err) {
    	console.log(err);
    });
}

console.log("Finished serving");


app.listen(process.env.PORT || 3000);
