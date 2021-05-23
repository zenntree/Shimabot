require('dotenv').config();

const Discord = require ('discord.js');
const client = new Discord.Client ();

const Mongoose = require ('mongoose');

const date = require ('date-and-time');
const now = new Date();

const guildID = '770391013112938496'

const prefix = '-'

client.on('ready', async () => {
    console.log(`Shimabot is online!`);
    console.log(`Started @ ${date.format(now, 'YYYY/MM/DD HH:mm:ss')}`);
    client.user.setActivity('Shima SMP', { type: 'PLAYING' })
         .then(presence => console.log(`Activity set to ${presence.activities[0].name}`))
         .catch(console.error);
});

// commands
client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    if (message.content.indexOf(prefix) !== 0) return;

    const args = message.content.slice(prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase();


    // no arg commands
    if ( args[0] === undefined )
    {
        switch (command)
        {
            case 'ping':
                message.channel.send('pong!');
                break;
            
            case 'ip':
                message.channel.send (`the IP is: **'gameryesmp.minehut.gg'**\nIf the server is not online enter the following command into the game chat: **'/join gameryesmp'**`);
                break;

            case 'helpstart':
                message.channel.send (`If the server is not online enter the following command into the game chat: **'/join gameryesmp'**`);
                break;

        }
    }

    else
    {
        message.channel.send (`:x:***'${args[0]}'** is not a valid argument for the command **'${command}'***:x:`);
    }
})

Mongoose.connect(process.env.MONGODB_SRV, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => {
    console.log (`Connected to the database @ ${date.format(now, 'YYYY/MM/DD HH:mm:ss')}`);
}).catch(console.error);

client.login (process.env.TOKEN);
