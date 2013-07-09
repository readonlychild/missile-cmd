var express = require("express");
var app = express();
app.use(express.logger());
app.use(express.static(__dirname + '/'));

app.get('/', function (request, response) {
  response.sendfile(__dirname + '/game-fb.htm');
});

app.post('/', function (request, response) {
	// facebook sends a post here...
	// example: /?fb_source=bookmark_apps&amp;ref=bookmarks&amp;count=0&amp;fb_bmpos=3_0
	response.sendfile(__dirname + '/game-fb.htm');
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});