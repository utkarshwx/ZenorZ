const Command = require('../../Structures/Command.js');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases : ['av']
		});
	}

	async run(message, args) {
		let userinfoget =
			message.mentions.members.first() ||
			message.guild.members.cache.get(args[0]) ||
			message.guild.member(message.author);

 let        target = message.mentions.users.first();

        if (!target)
            target = message.author;
        let avatarURL = target.displayAvatarURL({
            size: 4096,
            dynamic: true
			
        });
		//av2 = target.displayAvatarURL({
          //  size: 512,
            //dynamic: true,
			//format: 'png'
		//});
	let	av3 = target.displayAvatarURL({
            size: 512,
            dynamic: true,
			format: 'gif'
		});

		const embed = new MessageEmbed()
			.setImage(avatarURL)
			.setColor(`#00000`)
			.setTitle(`**Avatar of ${target.username} **`)
			.setFooter(`Powered by Zenorz`)
			.setDescription("[**WEBP**](" + avatarURL + ")" + " | [**GIF**](" + av3 + ")");

		message.channel.send(embed);
    }
};