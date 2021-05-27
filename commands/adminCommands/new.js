const Command = require ("C:/Users/shaba/Documents/Shimabot/models/Command.js");

module.exports = {
    commands: ['new', 'command', 'newcommand'],
    minArgs: 1,
    permissions: ['ADMINISTRATOR'],
    description: 'Creates new command in Database (non functional as of right now, will be in the future)',
    callback: (message, args, text) => {
        const newCommand = new Command ( {
            name: args[0],
            output: { function: () => { message.channel.send ( text ) } }
        })
        newCommand.save()
            .then(() => {
            message.channel.send (`**Created new command named *"${ args[0] }"*, do "-${ args[0] }" to use this command\n:exclamation: * The *"new"* command is not fully set up yet * :exclamation:**`);
            
            })
            .catch (console.error())
    }
}