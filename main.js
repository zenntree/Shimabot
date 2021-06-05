require('dotenv').config();

const path = require ('path')
const fs = require ('fs')

const Discord = require ('discord.js');
const client = new Discord.Client ();
const guild = new Discord.Guild ();

const commandBase = require('./commands/commands-base')

const config = require ('./config.json')

const date = require ('date-and-time');
const now = new Date();


client.on ('ready', async () => {
    console.log(`Shimabot started @ ${date.format (now, 'YYYY/MM/DD HH:mm:ss')}`);

    client.user.setActivity ('Shima SMP', { type: 'PLAYING' })
        .then (presence => console.log(`Activity set to '${presence.activities[0].type} ${presence.activities[0].name}'`))
        .catch (console.error);

    const baseFile = 'commands-base.js'

    const readCommands = dir => {
        const files = fs.readdirSync(path.join(__dirname, dir))
        for (const file of files) {
            const stat = fs.lstatSync(path.join(__dirname, dir, file))
            if (stat.isDirectory())
            {
                readCommands (path.join(dir, file))
            }
            else if ((file !== baseFile))
            {
                const option = require(path.join(__dirname, dir, file))
                commandBase(client, option)
            }
        }
    }

    readCommands ('commands');
});

client.login (process.env.TOKEN);