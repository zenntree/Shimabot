module.exports = {
    commands: ['ip', 'server', 'iphelp'],
    minArgs: 0,
    maxArgs: 0,
    description: 'Responds with ip for minecraft server',
    callback: (message, args, text) => {
        message.channel.send (`the IP is: **'gameryesmp.minehut.gg'**`);
    }
}