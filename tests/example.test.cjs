/* test */
const http = require('http');
const MemoryStream = require('../index');
const util = require('util');

let options = {
	host: 'google.com'
};

const memStream = new MemoryStream(null, {
    readable : false
});

const req = http.request(options, function(res) {
	res.pump(memStream);
	res.on('end',function(){
	    console.log(memStream.toString());
	});
});
req.end();
