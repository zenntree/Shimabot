const channelId = '849083299191193630'
const check = '✅'
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
  callback: (userMessage, args, text, client) => {
    const { guild, member } = userMessage

    const channel = guild.channels.cache.get(channelId)
    channel
      .send(
        `A new ticket has been created by <@${member.id}>
    
"${text}"
Click the ${check} icon when this issue has been resolved.`
      )
      .then((ticketMessage) => {
        ticketMessage.react(check)

        userMessage.reply(
          'Your ticket has been sent! Expect a reply within 24 hours.'
        )
      })
  },
}