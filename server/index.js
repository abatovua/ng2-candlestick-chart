const http = require('http');
const fs = require('fs');

const moment = require('moment');

const getMiliseconds = (dateString) => {
	return moment(dateString).valueOf();
}

let json = fs.readFileSync(__dirname + '/log2.json', 'utf-8');

let sorted = JSON.parse(json).sort((prev, next) => {
	return getMiliseconds(prev.date) - getMiliseconds(next.date);
});

json = JSON.stringify(sorted);

const server = http.createServer((req, res) => {
	if(req.url === '/data') {
		res.statusCode = 200;
		res.setHeader('Content-Type', 'application/json');
		res.setHeader('Access-Control-Allow-Origin', '*');
		res.end(json);
	} else {
		res.statusCode = 404;
		res.end('Not found');
	}
});

server.listen(3000, () => {
	console.log('Server is running on port 3000');
});