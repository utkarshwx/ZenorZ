const Command = require('../../Structures/Command.js');
const ms = require('ms');

module.exports = class extends Command {
  constructor(...args) {
		super(...args, {
			aliases : ['sm']
		});
	}

    async run(message, args, client) {
        {
            if(!message.member.hasPermission(['MANAGE_CHANNELS'])) return message.channel.send("you dont have perms to apply slowmode");
      
            if(!message.guild.me.hasPermission(['MANAGE_CHANNELS'])) return message.channel.send('provide me enough permission to apply slowmode')
      
            else{
            if (!args[0])
              return message.channel.send(`You did not specify the time in seconds you wish to set this channel's slow mode too!`);
              
            if (isNaN(args[0])) return message.channel.send(`That is not a number!`);
            
            message.channel.setRateLimitPerUser(args[0]);
            message.channel.send(
              `Set the slowmode of this channel too **${args[0]}**`
            );
          }}
    }
};