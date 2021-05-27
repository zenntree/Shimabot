module.exports = {
    commands: ['start', 'startserver', 'startup'],
    minArgs: 0,
    maxArgs: 0,
    callback: (message, args, text) => {
        message.channel.send (`If the server is not online enter the following command into the game chat: **'/join gameryesmp'**`)
    }
}