var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io').listen(http);

app.use(express.static('./public'));

http.listen(8080, function(){
  console.log("HTTP server started.");
});

io.on('connection', function(socket){
    var log = function(text) {
        console.log(socket.id + ' ' + (new Date()).toLocaleTimeString() + ': ' + text);
    };
  log("connected");
  socket.on('disconnected', function() {
      log("disconnected");
  });
  socket.on('hello', function(msg) {
     log("hello'd " + msg);
  });
});
