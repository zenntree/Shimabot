const channelId = '849083299191193630'
const check = '✅'

const Discord = require ('discord.js');
const client = new Discord.Client ();

// const role = guild.roles.cache.find((role) => role.name === 'ticket')

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
  commands: ['ticket', 'support'],
  minArgs: 0,
  expectedArgs: '<message>',
  callback: (message, args, text, client) => {
    
    const roleName = 'Ticket'
    const { guild } = message

    const role = guild.roles.cache.find((role) => {
      return role.name === roleName
    })

    const member = guild.members.cache.get(message.author.id)
    member.roles.add(role)
      .catch(console.error())

    const channel = guild.channels.cache.get(channelId)
    channel
      .send(
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
            member.roles.remove(role);
          }
        })
      })
  },
}