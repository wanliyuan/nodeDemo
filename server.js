var express = require('express');
var app = express();
var fs = require("fs");
var bodyParser = require('body-parser');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/index.html', function (req, res) {
   res.sendFile( __dirname + "/" + "index.html" );
})

app.get("/listUsers",function(req,res) {
	fs.readFile(__dirname + "/" + "users.json","utf8",function(err,data){
		console.log(data);
		res.end(data);
	});
})

app.post('/delUsers', function (req, res) {
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
       if (err) {
	      console.error(err);
	      process.exit(1);
	    }
	    var users = JSON.parse(data);
	    console.log(req.body);
	    for(var i=0;i<users.length;i++){
	    	if(users[i].id == req.body.id){
	    		console.log(i);
	    		users.splice(i, 1);
	    	}
	    }
	    console.log(users);
	    fs.writeFile(__dirname + "/" + "users.json",JSON.stringify(users, null, 4),function(err){
	    	if (err) {
		        console.error(err);
		        process.exit(1);
		    }
		    res.json(users);
	    })
   });
})

app.post('/addUsers', function (req, res) {
	//console.log(req.body);
	fs.readFile(__dirname + "/" + "users.json","utf8",function(err,data){
		if (err) {
	      console.error(err);
	      process.exit(1);
	    }
	    var users = JSON.parse(data);
	    var newusers = req.body;
	    users.push(newusers);
	    console.log(users);
	    fs.writeFile(__dirname + "/" + "users.json",JSON.stringify(users, null, 4),function(err){
	    	if (err) {
		        console.error(err);
		        process.exit(1);
		    }
		    res.json(users);
	    })
	})
})

var server = app.listen(8081,function(){
	var host = server.address().address;
	var port = server.address().port;
	console.log("应用实例，访问地址为 http://%s:%s", host, port)
})