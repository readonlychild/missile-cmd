var https = require('https');
var express = require('express');

var leaderboard = require('./Leaderboard');
leaderboard.init({appCode:'test.board'});

var app = express();

app.get('/info', function (req, res) {
	var body = '<h1>Information</h1>';
	body += "req.hostname = [" + req.host + "]";
	//console.log(req);
	//res.setHeader('Content-Type', 'text/plain');
	//res.setHeader('Content-Length', body.length);
	
	leaderboard.getLeaders(false, function (data) {
		console.log('from.Info>', data);
	});
	res.end(body);
	//res.send('Hello World');
});

app.get('/leaderboard/add/:board/:userId/:score', function (req, res) {
	
	leaderboard.addEntry({
		userId: req.params.userId,
		score: parseFloat(req.params.score),
		appCode: req.params.board
	}, function (data) {
		console.log('from.add-api>', data);
	});

	res.end(':D finished add-api!');
});

app.get('/leaderboard/:code', function (req, res) {

	leaderboard.getLeaders(req.params.code, function (data) {
		console.log('getLeaders.result', data);
		res.write(JSON.stringify(data));
		res.end();
	});
	//res.end();
});

app.listen(433);
console.log('Listening on port 433');