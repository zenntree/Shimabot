const check = '✅'

const Discord = require ('discord.js');
const client = new Discord.Client ();

let registered = false

const registerEvent = (client) => {
  if (registered) {
    return
  }

  registered = true

  console.log('REGISTERING EVENTS')

  client.on('messageReactionAdd', (reaction, user) => {
    if (user.bot) {
      return
    }

    console.log('HANDLING REACTION')
    const { message } = reaction
    if (message.channel.id === channelId) {
      message.delete()
    }
  })
}

module.exports = {
  commands: ['ticket', 'support', 'newticket'],
  minArgs: 0,
  expectedArgs: '<message>',
  callback: (message, args, text, client) => {
    
    const roleName = 'Ticket'
    const { guild } = message

    const role = guild.roles.cache.find((role) => {
      return role.name === roleName
    })

    guild.channels.create((`${message.author.username}-ticket`), {
      permissionOverwrites: [
        {
          id: guild.roles.everyone.id,
          deny: 'VIEW_CHANNEL'
        },
        {
          id: message.author.id,
          allow: 'VIEW_CHANNEL'
        }

      ]
    })
      .then(channel => {
        console.log('Created new ticket channel')
        const channelId = channel.id;
        const member = guild.members.cache.get(message.author.id)
    
        const ticketChannel = guild.channels.cache.get(channelId)
        ticketChannel.send(
            `A new ticket has been created by <@${member.id}>
        
    "${text}"
    Click the ${check} icon when this issue has been resolved.`
          )
          .then(ticketMessage => {
            ticketMessage.react(check)
    
            message.reply(
              'Your ticket has been sent! Expect a reply within 24 hours.'
            )
    
            client.on('messageReactionAdd', (reaction, user) =>{
              if(reaction.message.channel.id === channelId && reaction.message.id === ticketMessage.id && user.id !== '844998417872584744')
              {
                ticketChannel.overwritePermissions ([
                  {
                    id: guild.roles.everyone.id,
                    deny: 'VIEW_CHANNEL'
                  },
                  {
                    id: message.author.id,
                    deny: 'VIEW_CHANNEL'
                  }
                ])
                ticketChannel.setParent ('850819194135904276', {lockPermissions: true})
                ticketChannel.send ('**Channel archived**')
              }
            })
          })
      })
      .catch(console.error);

  },
}