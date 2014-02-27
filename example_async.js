
function tick( obj ) {
	for (var i = 5000 - 1; i >= 0; i--) {
		i+1;
	};
	obj.x += 1*8*9/17;
}
function tickAsync(obj, callback) {
	process.nextTick(function() {
		tick(obj);
		if (callback) callback(obj);
		if (callback) callback(obj);
		if (callback) callback(obj);
		if (callback) callback(obj);
		if (callback) callback(obj);
		if (callback) callback(obj);
	});
}
var myObj = {x:0};

var time = Date.now();
for (var i = 500- 1; i >= 0; i--) {
	tick(myObj);
};
console.log(Date.now()-time);

time = Date.now();
for (var i = 500 - 1; i >= 0; i--) {
	tickAsync(myObj);
};
console.log(Date.now()-time);

console.log(myObj.x);
