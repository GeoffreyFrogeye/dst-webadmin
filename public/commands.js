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
