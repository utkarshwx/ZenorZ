const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageAttachment } = require('discord.js');
 
module.exports = {
	data: new SlashCommandBuilder()
		.setName('avatar')
		.setDescription('Shows user avatar')
		.addUserOption(option => option.setName('user').setDescription('The user\'s avatar to show').setRequired(false)),
	async execute(interaction) {
		const user = interaction.options.getUser('user') || interaction.user ;

			const file = new MessageAttachment(`${user.displayAvatarURL({ size: 4096, dynamic: true })}`)
			return interaction.reply({ files : [file]});
		
	},
};