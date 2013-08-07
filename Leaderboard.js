var https = require('https');

var _context = {};

exports.init = function (options) {
	_context.appCode = options.appCode || '_default';
	_context.dbName = options.dbName || 'gamestore';
	_context.collName = options.collName || 'leaderboard';
	_context._apikey = options._apikey || 'SRjT6dtJFin5RZhx5qUIxYqLdDKRDskF';
	_context.serverHost = 'api.mongolab.com';
	_context.serverPath = '/api/1/databases/' + _context.dbName + '/collections/' + _context.collName + '/';
	_context.authorizedHosts = [
		'127.0.0.1'
	];
};

exports.getLeaders = function (boardCode, callback) {
	var bcode = boardCode || _context.appCode;
	var p = _context.serverPath + '?apiKey=' + _context._apikey;
	// &q={appCode:"test.board"}&s={score:-1}&l=10
	p += "&q={appCode:\"" + bcode + "\"}&s={score:-1}&l=10";
	var options = {
		hostname: _context.serverHost,
		host: _context.serverHost,
		method: 'GET',
		path: p
	};
	//console.log('getLeaders>', options.hostname, p);
	var responseText = '';
	var req = https.request(options, function (res) {
		//console.log('requesting.h1>');
		res.on('data', function (chunk) {
			responseText += chunk;
		});
		res.on('end', function () {
			//console.log('lb.getLeaders', responseText);
			if (callback) callback(JSON.parse(responseText));
		});
	});
	req.on('error', function (e) {
		console.log('getLeaders.req.err>', e);
	});
	req.end();
};

exports.getRecent = function (boardCode, callback) {
	var bcode = boardCode || _context.appCode;
	var p = _context.serverPath + '?apiKey=' + _context._apikey;
	p += "&q={appCode:\"" + bcode + "\"}&s={created:-1}&l=5";
	var options = {
		hostname: _context.serverHost,
		host: _context.serverHost,
		method: 'GET',
		path: p
	};
	var responseText = '';
	var req = https.request(options, function (res) {
		res.on('data', function (chunk) {
			responseText += chunk;
		});
		res.on('end', function () {
			if (callback) callback(JSON.parse(responseText));
		});
	});
	req.on('error', function (e) {
		console.log('getRecent.req.err>', e);
	});
};

exports.addEntry = function (entry, callback) {

	entry.appCode = entry.appCode || _context.appCode;
	entry.created = new Date().toJSON();

	var boardEntry = JSON.stringify(entry);

	console.log('addE>', boardEntry);

	var headers = {
		//'Accept': '*',
		'Content-Type': 'application/json',
		'Content-Length': boardEntry.length //,
		//'Connection': ''
	};

	var options = {
		hostname: _context.serverHost,
		method: 'POST',
		path: _context.serverPath + '?apiKey=' + _context._apikey,
		headers: headers
	};

	var responseString = '';

	var mongoreq = https.request(options, function (mres) {
		
		mres.setEncoding('utf-8');

		console.log('statusCode: ', mres.statusCode);
		console.log('headers: ', mres.headers);

		
		mres.on('data', function (chunk) {
			responseString += chunk;
		});

		mres.on('end', function () {
			console.log(responseString);
			if (callback) callback(responseString);
		});

	});
	
	mongoreq.write(boardEntry);
	console.log(boardEntry);
	mongoreq.end();
	mongoreq.on('error', function (e) { console.log('**ERROR* ', e) });
	
};
