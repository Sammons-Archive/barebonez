
/**
 * Module dependencies.
 */

var express = require('express');

var http = require('http');
var path = require('path');
var fileSystem = require('fs');
var mymodule = require('./mymodule.js');
mymodule.some_exported_function(function() {
	console.log('hello')
});

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}
mymodule.injectRoutes(app);

var newpage = fileSystem.readFileSync("./newpage.html");

function some_function() {
	console.log(newpage+' ');
}

mymodule.some_exported_function(some_function);
app.get('/newpage',function(req,res) {
	 fileSystem.readFile("./newpage.html",function(err,data) {
	 	if (err) throw err;
	 	res.end(data);
	 });
});



http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
