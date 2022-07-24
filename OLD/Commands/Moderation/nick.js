const Command = require('../../Structures/Command');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases : ['nickname']
		});
	}

	async run(message, args) {
        if (!message.member.hasPermission(["MANAGE_NICKNAMES"])) return message.channel.send("**You Dont Have Permissions To Change Nickname! - [MANAGE_NICKNAMES]**");      
        if (!args[0]) return message.channel.send("**Please Enter A User!**")
      
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase()) || message.member;
        if (!member) return message.channel.send("**Please Enter A Username!**");

        if (member.roles.highest.comparePositionTo(message.guild.me.roles.highest) >= 0) return message.channel.send('**Cannot Set or Change Nickname Of This User!**')

        if (!args[1]) {member.setNickname(args.slice(1).join(' '));
             message.channel.send("NAME RESETED");}
        else{
        member.setNickname(args.slice(1).join(' '))
            message.channel.send(`Changed Nickname of **${member.displayName}** to **${args.slice(1).join(' ')}**`);
        }
    }
};