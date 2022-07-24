const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			
		});
	}

	async run(message, args){
	if(!message.member.hasPermission(["MANAGE_MESSAGES"])) return message.reply("**You Dont Have Permissions To USE! - [MANAGE_MESSAGES]**");

	let mChannel = message.mentions.channels.first();
	if(!args[0]) return message.channel.send("MESSAGE MISSING");
	else{
	if(mChannel){
		mChannel.send(args.slice(1).join(" "))
	}else{
		message.channel.send(args.join(" "))
	}
}
}};