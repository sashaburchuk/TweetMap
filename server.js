var express = require("express");
var app = express();
var http = require("http");
var server = http.createServer(app);
var io = require("socket.io").listen(server);
var Twit = require("twit");

var port = process.env.PORT || 3000;

server.listen(port);

app.use(express.static(__dirname + "/public"));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

var twit = new Twit({
    consumer_key: "YOUR KEY", 
    consumer_secret: "YOUR KEY", 
    access_token: "YOUR KEY", 
    access_token_secret: "YOUR KEY"
});

io.sockets.on("connection", function (socket) {
    var keyword;
    var stream;
    // var world = ['-180', '-90', '180', '90'];

    socket.on("tracking", function(keyword) {
      stream = twit.stream("statuses/filter", { track: keyword});
      console.log("Tracking new keyword " + keyword);
      stream.on("tweet", function (tweet) {

      if(tweet.coordinates){
        if(tweet.coordinates !== null) {
          console.log("another tweet!");

          var outputPoint = {"lat": tweet.coordinates.coordinates[0],"lng": tweet.coordinates.coordinates[1]};

          io.sockets.emit("stream", tweet, outputPoint);
        }
      }
    });

  });

  socket.on("disconnect", function(socket) {
    if (stream) {
      stream.stop();
    }
  });

  socket.emit("connected");
});