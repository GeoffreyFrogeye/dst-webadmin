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

    function execCmd(e) {
        var form = $(e.target).parent();
        var cmd = '';
        var isText = true;
        var cmdSplit = form.data('cmd').cmd.split('%');
        var valuesAr = form.serializeArray();
        var values = {};
        Object.keys(valuesAr).map(function (value, index) {
            value = valuesAr[index];
            values[value.name] = value.value;
        });
        for (var cdI in cmdSplit) {
            var cd = cmdSplit[cdI];
            if (isText) {
                cmd += cd;
            } else {
                cmd += values[cd] ? values[cd] : 'false';
            }
            isText = !isText;
        }
        input(cmd);
    }

    for (var cmdI in globalCommands) {
        var cmd = globalCommands[cmdI];
        var form = $('<form>').data('cmd', cmd).submit(function() { return false });
        if (cmd.args) {
            var inputs = {};
            for (var argI in cmd.args) {
                var arg = cmd.args[argI];
                var inp = null;
                if (arg.type == 'select') {
                    inp = $('<select>').attr('name', arg.name);
                    for (var optI in arg.options) {
                        var opt = arg.options[optI];
                        var optH = $('<option>').val(opt).append(opt);
                        inp.append(optH);
                    }
                } else {
                    inp = $('<input>');
                    for (var paramI in arg) {
                        inp.attr(paramI, arg[paramI]);
                    }
                }
                if (cmd.autoEx) {
                    inp.change(execCmd);
                }
                inputs[arg.name] = inp;
            }

            var isText = true;
            var nameSplit = cmd.name.split('%');
            for (var nsI in nameSplit) {
                var ns = nameSplit[nsI];
                form.append(isText ? ns : inputs[ns]);
                isText = !isText;
            }
        }

        if (!cmd.autoEx) {
            form.append($('<input>')
                .attr('type', 'submit')
                .val(cmd.args ? 'Execute' : cmd.name)
                .click(execCmd));
        }
        $('#globalCommands').append(form);
    }
});
