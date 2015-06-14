var socket = io();

socket.on('err', function (funName, e) {
    console.error(funName, e);
});

function updateStatus(started) {
    $('#status').text(started ? 'Started' : 'Stopped');
}

function addLog(time, type, msg) {
    var log = $('#log');
    log.append('<div class="' + type + '">' + msg + '</div>');
    $('#logCont').scrollTop(log.height());
}

function input(msg) {
    socket.emit('input', msg);
}

$(function () {
    socket.emit('isStarted', function (started) {
        updateStatus(started);
    });
    socket.emit('getLog', function (log) {
        for (var lineI in log) {
            var line = log[lineI];
            addLog(line.time, line.type, line.msg);
        }
    });

    socket.on('started', function () {
        updateStatus(true);
    });
    socket.on('stopped', function () {
        updateStatus(false);
    });

    socket.on('stdout', function (msg) {
        addLog(new Date(), 'stdout', msg);
    });
    socket.on('stdin', function (msg) {
        addLog(new Date(), 'stdin', msg);
    });
    socket.on('stderr', function (msg) {
        addLog(new Date(), 'stderr', msg);
    });
    socket.on('logReset', function () {
        $('#log').empty();
    });

    $('#input').submit(function (event) {
        input($('#input [name=command]').val());
        $('#input [name=command]').val('');
        return false;
    });

    function exec(e) {
        input($(e.target).data('cmd').cmd);
    }
    for (var cmdI in globalCommands) {
        var cmd = globalCommands[cmdI];
        var button = $('<input>')
            .attr('type', 'button')
            .val('Execute')
            .data('cmd', cmd)
            .click(exec);
        $('#globalCommands').append(
            $('<div>')
            .append(cmd.name + ' ')
            .append(button)
        );
    }
});
