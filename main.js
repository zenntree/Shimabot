require('dotenv').config();

const guildID = '770391013112938496'

const Discord = require ('discord.js');
const client = new Discord.Client ();

const Mongoose = require ('mongoose');

const Command = require ('./models/Command');

const Activity = require ('./models/Activity');

const date = require ('date-and-time');
const now = new Date();

const prefix = '-'


client.on ('ready', async () => {
    console.log(`Shimabot started @ ${date.format (now, 'YYYY/MM/DD HH:mm:ss')}`);

    client.user.setActivity ('Shima SMP', { type: 'PLAYING' })
        .then (presence => console.log(`Activity set to '${presence.activities[0].type} ${presence.activities[0].name}'`))
        .catch (console.error);
});



// commands
client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    if (message.content.indexOf(prefix) !== 0) return;

    const args = message.content.slice(prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase();


    // no arg commands
        switch (command)
        {
            case 'ping':
                if ( args[0] !== undefined) {
                    message.channel.send (`:x:***'${args[0]}'** is not a valid argument for the command **'${command}'***:x:`);
                    break;
                }

                message.channel.send('pong!');
                
                break;
            
            case 'ip':
                if ( args[0] !== undefined) {
                    message.channel.send (`:x:***'${args[0]}'** is not a valid argument for the command **'${command}'***:x:`);
                    break;
                }

                message.channel.send (`the IP is: **'gameryesmp.minehut.gg'**\nIf the server is not online enter the following command into the game chat: **'/join gameryesmp'**`);
                
                break;

            case 'helpstart':
                if ( args[0] !== undefined) {
                    message.channel.send (`:x:***'${args[0]}'** is not a valid argument for the command **'${command}'***:x:`);
                    break;
                }

                message.channel.send (`If the server is not online enter the following command into the game chat: **'/join gameryesmp'**`);
                
                
                break;
        }

        switch (command)
        {
            case 'new':
                // let allowedRole = message.guild.roles.find(message.author.tag, 'Titty Gang MODS');
                // if ( allowedRole ('770391101437640744') ) { break };
                
            
                const newCommand = new Command ( {
                    name: args[0],
                    output: { function: () => { message.channel.send ( args[1] ) } }
                })
                newCommand.save()
                    .then(() => {
                        console.log(message.author.tag + ' created a new command named ' + args[0]);
                        
                        message.channel.send (`**Created new command named *"${ args[0] }"*, do "-${ args[0] }" to use this command\n:exclamation: * The *"new"* command is not fully set up yet * :exclamation:**`);
                        
                    })
                    .catch (console.error())
                    break;
            case 'status':
                let newActivity;
                let wordCount = parseInt(args[0])
                console.log (wordCount);
                if ( args[1+wordCount] !== undefined )
                {
                    newActivity = args[1];

                    for (i = 2; i <= wordCount; i++)
                    {
                        newActivity = newActivity + ' ' + args[i];
                    }
                    console.log (args);
                    console.log (args[wordCount + 1])
                    console.log (newActivity);

                    client.user.setActivity (newActivity, { type: args[wordCount +1] })
                        .then (presence => message.channel.send(`Activity set to '${presence.activities[0].type} ${presence.activities[0].name}'`))
                        .then (presence => console.log(`Activity set to '${presence.activities[0].type} ${presence.activities[0].name}'`))
                        .catch (console.error);
                }
                else {
                    message.channel.send(`:x: **Error** :x:`)
                    break
                }
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