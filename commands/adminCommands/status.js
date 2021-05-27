module.exports = {
    commands: ['setstatus', 'status', 'changestatus'],
    permissions: ['ADMINISTRATOR'],
    expectedArgs: '<type> <activity>',
    minArgs: 1,
    callback: (message, args, text, client) => {
        type = args[0].toUpperCase();
        const validTypes = [
            'PLAYING',
            'STREAMING',
            'LISTENING',
            'WATCHING'       
        ]
        if (!validTypes.includes (type))
        {
            message.channel.send (`Unknown activity type`)
            return
        }

        client.user.setActivity (text, { type: type })
            .then (presence => {
                console.log(`Activity set to '${presence.activities[0].type} ${presence. activities[0].name}'`)
                message.channel.send (`Activity set to '${presence.activities[0].type} ${presence. activities[0].name}'`)
            })
            .catch (console.error);
    }
}