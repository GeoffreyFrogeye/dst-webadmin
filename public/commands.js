var settings = [{
    name: "Name",
    ini: 'network.default_server_name',
    opts: {
        type: 'text',
        placeholder: "[Host]'s server"
    }
}, {
    name: "Description",
    ini: 'network.default_server_description',
    opts: {
        type: 'text'
    }
}, {
    name: "Port",
    ini: 'network.server_port',
    opts: {
        type: 'number',
        min: 0,
        max: 65535,
        step: 1,
        placeholder: 10999
    }
}, {
    name: "Password",
    ini: 'network.server_password',
    opts: {
        type: 'text'
    }
}, {
    name: "Maximum player number",
    ini: 'network.max_players',
    opts: {
        type: 'number',
        min: 1,
        max: 64,
        step: 1,
        placeholder: 64
    }
}, {
    name: "PVP",
    ini: 'network.pvp',
    opts: {
        type: 'checkbox',
        value: 1
    }
}, {
    name: "Game mode",
    ini: 'network.game_mode',
    opts: {
        type: 'select',
        options: ['endless', 'survival', 'wilderness']
    }
}, {
    name: "Enable snapshots",
    ini: 'network.enable_snapshots',
    opts: {
        type: 'checkbox',
        value: 1
    }
}, {
    name: "Enable autosaver",
    ini: 'network.enable_autosaver',
    opts: {
        type: 'checkbox',
        value: 1
    }
}, {
    name: "Tick rate",
    ini: 'network.tick_rate',
    opts: {
        type: 'select',
        options: [10, 15, 30, 60]
    }
}, {
    name: "Connection timeout",
    ini: 'network.connection_timeout',
    opts: {
        type: 'number',
        min: 1000,
        max: 90000,
        step: 1000,
        placeholder: 8000,
    }
}, {
    name: "Save slot",
    ini: 'network.server_save_slot',
    opts: {
        type: 'select',
        options: [1, 2, 3, 4, 5]
    }
}, {
    name: "Enable vote kick",
    ini: 'network.enable_vote_kick',
    opts: {
        type: 'checkbox',
        value: 1
    }
}, {
    name: "Pause when empty",
    ini: 'network.pause_when_empty',
    opts: {
        type: 'checkbox',
        value: 1
    }
}, {
    name: "Dedicated LAN server",
    ini: 'account.dedicated_lan_server',
    opts: {
        type: 'checkbox',
        value: 1
    }
}];

var globalCommands = [{
    name: "List all players",
    cmd: 'c_listallplayers()',
}, {
    name: "Kick %player%",
    cmd: 'TheNet:Kick("%player%")',
    args: [{
        'name': 'player',
        'type': 'text',
        'placeholder': 'player',
    }],
}, {
    name: "Ban %player%",
    cmd: 'TheNet:Ban("%player%")',
    args: [{
        'name': 'player',
        'type': 'text',
        'placeholder': 'player',
    }],
}, {
    name: "Spanw %amount% %prefab%",
    cmd: 'c_spawn("%prefab%", %amount%)',
    args: [{
        'name': 'prefab',
        'type': 'text',
        'placeholder': 'prefab',
    }, {
        'name': 'amount',
        'type': 'number',
        'value': 1,
        'min': 1,
        'step': 1,
    }],
}, {
    name: "Give %amount% %prefab%",
    cmd: 'c_give("%prefab%", %amount%)',
    args: [{
        'name': 'prefab',
        'type': 'text',
        'placeholder': 'prefab',
    }, {
        'name': 'amount',
        'type': 'number',
        'value': 1,
        'min': 1,
        'step': 1,
    }],
}, {
    name: "Set health to %percent%",
    cmd: 'c_sethea​lth(%percent%)',
    args: [{
        'name': 'percent',
        'type': 'number',
        'value': 1,
        'min': 0,
        'max': 1,
        'step': 0.01,
    }],
}, {
    name: "Set sanity to %percent%",
    cmd: 'c_setsanity(%percent%)',
    args: [{
        'name': 'percent',
        'type': 'number',
        'value': 1,
        'min': 0,
        'max': 1,
        'step': 0.01,
    }],
}, {
    name: "Set hunger to %percent%",
    cmd: 'c_sethunger(%percent%)',
    args: [{
        'name': 'percent',
        'type': 'number',
        'value': 1,
        'min': 0,
        'max': 1,
        'step': 0.01,
    }],
}, {
    name: "Toggle god mode",
    cmd: 'c_godmode()',
}, {
    name: "Multiply speed by %speed%",
    cmd: 'c_speedmult(%speed%)',
    args: [{
        'name': 'speed',
        'type': 'number',
        'value': 1,
        'min': 0,
        'step': 1,
    }],
    autoEx: true,
}, {
    name: "Skip %days% day",
    cmd: '​LongUpdate(%days%*TUNING.TOTAL_DAY_TIME)',
    args: [{
        'name': 'days',
        'type': 'number',
        'value': 1,
        'min': 0,
        'step': 0.01,
    }]
}, {
    name: "Skip phase",
    cmd: 'TheWorld:PushEvent("ms_nextphase")',
}, {
    name: "Set segments %day% + %dusk% + %night% = 16",
    cmd: '​TheWorld:PushEvent("ms_setclocksegs", {day=%day%,dusk=%dusk%,night=%night%})',
    args: [{
        'name': 'day',
        'type': 'number',
        'value': 1,
        'min': 0,
        'max': 16,
        'step': 1,
    }, {
        'name': 'dusk',
        'type': 'number',
        'value': 1,
        'min': 0,
        'max': 16,
        'step': 1,
    }, {
        'name': 'night',
        'type': 'number',
        'value': 1,
        'min': 0,
        'max': 16,
        'step': 1,
    }]
}, {
    name: "Start %season%",
    cmd: 'TheWorld:PushEvent("ms_setseason", "%season%")',
    args: [{
        'type': 'select',
        'name': 'season',
        'options': ['autumn', 'winter', 'spring', 'summer']
    }],
    autoEx: true,
}, {
    name: "%activated% Rain",
    cmd: 'TheWorld:PushEvent("ms_forceprecipitation", %activated%)',
    args: [{
        'name': 'activated',
        'type': 'checkbox',
        'value': 1
    }],
    autoEx: true,
}, {
    name: "%activated% Allow incoming connections",
    cmd: 'TheNet:SetAllowIncomingConnections(%activated%)',
    args: [{
        'name': 'activated',
        'type': 'checkbox',
        'value': 1,
        'checked': true
    }],
    autoEx: true,
}, {
    name: "Clear morgue",
    cmd: 'ErasePersistentString("morgue")',
}, {
    name: "Save the server",
    cmd: 'c_save()',
}, {
    name: "Reset server (%save%save)",
    cmd: 'c_reset(%save%)',
    args: [{
        'name': 'save',
        'type': 'checkbox',
        'value': 1,
        'checked': true
    }],
}, {
    name: "Regenerate world",
    cmd: 'c_regenerateworld()',
}, {
    name: "Stop server (%save%save)",
    cmd: 'c_shutdown(%save%)',
    args: [{
        'name': 'save',
        'type': 'checkbox',
        'value': 1,
        'checked': true
    }],
}];
