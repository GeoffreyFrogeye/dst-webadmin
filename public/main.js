var socket = io();

socket.on('err', function(funName, e) {
    console.error(funName, e);
});

function updateStatus(started) {
    $('#status').text(started ? 'started' : 'stopped');
}

$(function () {
    socket.emit('isStarted', function (started) {
        updateStatus(started);
    });
    socket.on('started', function () {
        updateStatus(true);
    });
    socket.on('stopped', function () {
        updateStatus(false);
    });
});
