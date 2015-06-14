var globalCommands = [{
    name: "Forbid movement",
    cmd: 'c_speedmult(0)',
}, {
    name: "Allow movement",
    cmd: 'c_speedmult(1)',
}, {
    name: "Toggle god mode",
    cmd: 'c_godmode()',
}, {
    name: "List all players",
    cmd: 'c_listallplayers()',
}, {
    name: "Skip day",
    cmd: '​TheWorld:PushEvent("ms_nextcycle")',
}, {
    name: "Skip phase",
    cmd: 'TheWorld:PushEvent("ms_nextphase")',
}, {
    name: "Start summer",
    cmd: 'TheWorld:PushEvent("ms_setseason", "summer")',
}, {
    name: "Start winter",
    cmd: 'TheWorld:PushEvent("ms_setseason", "winter")',
}, {
    name: "Start rain",
    cmd: 'TheWorld:PushEvent("ms_forceprecipitation")',
}, {
    name: "Stop rain",
    cmd: 'TheWorld:PushEvent("ms_forceprecipitation", false)',
}, {
    name: "Reset day",
    cmd: 'c_reset(false)',
}, {
    name: "Reload world",
    cmd: 'c_reset(true)',
}, {
    name: "Regenerate world",
    cmd: 'c_regenerateworld()',
}, {
    name: "Save the server",
    cmd: 'c_save()',
}, {
    name: "Stop server without saving",
    cmd: 'c_shutdown(false)',
}, {
    name: "Save and stop the server",
    cmd: 'c_shutdown(true)',
}, {
    name: "Allow incoming connections",
    cmd: 'TheNet:SetAllowIncomingConnections(true)',
}, {
    name: "Forbid incoming connections",
    cmd: 'TheNet:SetAllowIncomingConnections(false)',
}, {
    name: "Clear morgue",
    cmd: 'ErasePersistentString("morgue")',
}];
