var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io').listen(http);
var EventEmitter = require('events').EventEmitter;
var spawn = require('child_process').spawn;
var fs = require('fs');
var ini = require('ini');

app.use(express.static('./public'));

http.listen(8080, function () {
    console.log("HTTP server started.");
});

function DSTS() {
    this.path = '../bin';
    this.iniPath = (process.env.HOME || process.env.USERPROFILE) + '/.klei/DoNotStarveTogether/settings.ini';
    this.proc = null;
}

DSTS.prototype = {
    start: function () {
        var that = this;
        this.proc = spawn(that.path + '/dontstarve_dedicated_server_nullrenderer', [
            '-console'
        ], {
            cwd: that.path
        });
        console.log("DST server started");
        process.on('exit', that.kill);
        this.emit('started');

        this.resetLog();
        this.proc.stdout.on('data', function (data) {
            that.emit('stdout', data.toString());
            that.log.push({time: new Date(), type: 'stdout', msg: data.toString()});
        });
        this.proc.stderr.on('data', function (data) {
            that.emit('stderr', data.toString());
            that.log.push({time: new Date(), type: 'stderr', msg: data.toString()});
        });

        this.proc.on('exit', function() {
            console.log("DST server stopped");
            that.kill();
        });
    },
    kill: function() {
        if (!this.proc) return;
        this.proc.kill();
        this.proc = null;
        this.emit('stopped');
        console.log("DST server killed");
    },
    isStarted: function (cb) {
        cb(!!this.proc);
    },
    getLog: function(cb) {
        cb(this.log);
    },
    resetLog: function() {
        this.log = [];
        this.emit('logReset');
    },
    input: function(msg) {
        this.proc.stdin.write(msg + "\n");
        this.emit('stdin', msg);
        this.log.push({time: new Date(), type: 'stdin', msg: msg});
    },
    readIni: function(cb) {
        fs.readFile(this.iniPath, 'utf-8', function(err, data) {
            if (err) {
                throw err;
            }
            cb(ini.parse(data));
        });
    }
};

// Inherit from EventEmitter
for (var key in EventEmitter.prototype) {
    DSTS.prototype[key] = EventEmitter.prototype[key];
}

var dsts = new DSTS();
dsts.start();

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
