const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			
		});
	}

	async run(message,args,client) {
        if (!message.member.hasPermission("KICK_MEMBERS"))
			  return message.channel.send(
				`You Don't Have Permission To Use This Command!`
			  );
		
			let Member = message.mentions.users.first();
		
			if (!Member)
			  return message.channel.send(
				`Please Mention A Member That You Want To Kick!`
			  );
		
			if (!message.guild.members.cache.get(Member.id))
			  return message.channel.send(`Please Mention A Valid Member!`);
		
			if (Member.id === message.author.id)
			  return message.channel.send(`You Can't Kick Your Self!`);
		
			if (Member.id === this.client.user.id)
			  return message.channel.send(`Please Don't Kick Me ;-;`);
		
			if (Member.id === message.guild.owner.user.id)
			  return message.channel.send(`You Can't Kick Owner Of Server!`);
		
			let Reason = args.slice(1).join(" ");
		
			let User = message.guild.member(Member);
		
			if (!User.kickable)
			  return message.channel.send(`I Can't Kick That Member!`);
		
			try {
			  console.log(`Member Is Going To Get Kick!`);
		
			  setTimeout(function() {
				User.kick({ reason: `${Reason || "No Reason Provided!"}` });
			  }, 2000);
			  const kembed = new MessageEmbed()
				.setColor('#00000')
				.setTitle(`Member Kicked!`)
				.addField(`Moderator`, `${message.author.tag} (${message.author.id}`)
				.addField(`Kicked Member`, `${Member.tag} (${Member.id})`)
				.addField(`Reason`, `${Reason || "No Reason Provided!"}`)
				.setFooter(`Requested by ${message.author.username}`)
				.setTimestamp();
			  if (User && Member.bot === false)
				Member.send(
				  `You Have Been Kicked From **${message.guild.name}** For ${Reason ||
					"No Reason Provided!"}`
				);
			  message.channel.send(kembed);
			  console.log(
				`User: ${Member.tag} (${Member.id}) Just Got Kicked From ${
				  message.guild.name
				} For ${Reason || "No Reason Provided!"}`
			  );
			} catch (error) {
			  return message.channel
				.send(
				  `I Can't Kick That Member Maybe Member Has Higher Role Than Me & My Role Is Lower Than Member!`
				)
				.then(() => console.log(error));
			}
		
			//End
		  
    }};