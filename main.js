require('dotenv').config();

const Discord = require ('discord.js');
const client = new Discord.Client ();

const config = require ('./config.json')

const Mongoose = require ('mongoose');

const commandHandel = require ('./commandHandle')

const Admin = require ('./models/Admin')
const Command = require ('./models/Command');

const date = require ('date-and-time');
const now = new Date();

const prefix = '-'


client.on ('ready', async () => {
    console.log(`Shimabot started @ ${date.format (now, 'YYYY/MM/DD HH:mm:ss')}`);

    client.user.setActivity ('Shima SMP', { type: 'PLAYING' })
        .then (presence => console.log(`Activity set to '${presence.activities[0].type} ${presence.activities[0].name}'`))
        .catch (console.error);

    // command (client, 'ban', message =>{
    //     const { member, mentions } = message

    //     if (member.hasPermission)
    // });
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


        // admin only commands
        console.log (message.author.id)
        
            if(Admin.exists({ memberID: message.author.id })
                .then(console.log(`this member is an admin and can use this command`))
                .catch(console.error)
            )
        {
            switch (command)
            {
                case 'addadmin':
                    if (args[0] === undefined || args[1]) 
                    {
                        message.channel.send(`:x: **Error** :x:`)
                        break;
                    }

                    else 
                    {
                        const memberID = args[0].substring(3, 21)

                        const newAdmin = new Admin ({
                        memberID: memberID
                        })

                        newAdmin.save()
                            .then(message.channel.send(`${args[0]} is now an admin`))
                            .catch(console.error());
                        break;
                    }


                case 'new':               
                    
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
                        let newActivityType = args[0]
                        let newActivity = args[1]

                        if ( args[2] !== undefined )
                        {
                            for (i = 2; i < args.length; i++)
                                {
                                newActivity = newActivity + ' ' + args[i];
                            }
                            client.user.setActivity (newActivity, { type: newActivityType })
                                .then (presence => console.log(`Activity set to '${presence.activities[0].type} ${presence. activities[0].name}'`))
                                .catch (console.error);

                            message.channel.send(`**Setting Activity to *'${newActivityType} ${newActivity}'***`)
                        }
                        else {
                            console.log (args)
                            message.channel.send(`:x: **Error** :x:`)
                         break
                        }
                    
                    
                    }
        }
            else { message.channel.send (`:x: **<@${member.id}> you do not have permission to use** :x:`) }
        })


Mongoose.connect(process.env.MONGODB_SRV, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => {
    console.log (`Connected to the database @ ${date.format(now, 'YYYY/MM/DD HH:mm:ss')}`);
}).catch(console.error);

client.login (process.env.TOKEN);