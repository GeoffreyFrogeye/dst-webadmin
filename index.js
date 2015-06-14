var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io').listen(http);
var EventEmitter = require('events').EventEmitter;
var spawn = require('child_process').spawn;

app.use(express.static('./public'));

http.listen(8080, function () {
    console.log("HTTP server started.");
});

function DSTS() {
    this.path = '../bin';
    this.proc = null;
}

DSTS.prototype = {
    start: function () {
        var that = this;
        this.proc = spawn(that.path + '/dontstarve_dedicated_server_nullrenderer', [], {
            cwd: that.path
        });
        console.log("DST server started");
        this.emit('started');
    },
    isStarted: function (cb) {
        cb(!!this.proc);
    },
};

// Inherit from EventEmitter
for (var key in EventEmitter.prototype) {
    DSTS.prototype[key] = EventEmitter.prototype[key];
}

var dsts = new DSTS();

// Socket connection is some kind of proxy to dsts
io.on('connection', function (socket) {
    var log = function (text) {
        console.log(socket.id + ' ' + (new Date()).toLocaleTimeString() + ': ' + text);
    };

    // DSTS' events → Socket message
    var oldEmitter = dsts.emit;
    dsts.emit = function () {
        socket.emit.apply(socket, arguments);
        oldEmitter.apply(dsts, arguments);
    };
    socket.on('disconnect', function () {
        dsts.emit = oldEmitter;
        log("disconnected");
    });

    // Socket message → DSTS' functions
    var oldReceiver = socket.onevent;
    socket.onevent = function (packet) {
        var args = ["*"].concat(packet.data || []);
        oldReceiver.call(this, packet);
        funName = packet.data[0];
        if (typeof dsts[funName] == 'function') {
            args = packet.data;
            args.splice(0, 1);
            try {
                dsts[funName].apply(dsts, args);
            } catch (e) {
                socket.emit('err', funName, e.message);
                log(funName + ': ' + e);
            }
        } else {
            socket.emit('err', funName, "no such function");
            log("Called unknown function " + funName);
        }
    };
    log("connected");
});
