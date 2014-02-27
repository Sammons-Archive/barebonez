var routes = require('./routes');
var user = require('./routes/user');

exports.some_exported_function = function(callback) {
	callback();
};

exports.injectRoutes = function(app) {
	app.get('/', routes.index);
	app.get('/users', user.list);
	app.get('/recieve', function(request, response){
		response.end('hello there');
	});
	var j = {};
	for (var i = 100 - 1; i >= 0; i--) {
		app.get('/'+i, function(req,res) {	
			if (req.url.length > 3) 
				j[req.url.split('=')[0].substr(3)] = 'defined!';
			res.end(''+req.url.split('=')[0].substr(3));
		});
	};
	setInterval(function() {
	if (Object.keys(j).length > 0) console.log(j);
}, 10);
}