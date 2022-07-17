
/* test */
const http = require('http');
const MemoryStream = require('../dist/index');
const util = require('util');

var options = {
	host: 'google.com'
};

var memStream = new MemoryStream(null, {
    readable : false
});

var req = http.request(options, (res) => {
	res.pump(memStream);
	res.on('end', () => {
	    console.log(memStream.toString());
	});
});
req.end();