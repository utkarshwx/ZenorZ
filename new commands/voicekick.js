const { SlashCommandBuilder } = require('@discordjs/builders');
const {
    Permissions,
    MessageEmbed,
    MessageActionRow,
    MessageButton,
  } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('voicekick')
		.setDescription('Select a member and them from vc')
		.addUserOption(option => option.setName('user').setDescription('The member to kick from vc').setRequired(true)),
        //.addStringOption(option => option.setName('reason').setDescription('Reason for giving warn').setRequired(true)),
	async execute(interaction, client ) {
		//const member = interaction.options.get('user').value;            

		if (!interaction.member.permissions.has(Permissions.FLAGS.MOVE_MEMBERS))
        return await interaction.reply({
          content: "You can't run this command!",
          ephemeral: true,
        });
		  
		const member = interaction.options.getMember('user');
		const reason = 'No reason provided';
		  
		
            member.voice.kick(reason);
            interaction.reply("Member Disconnected/Voice Kicked!")
	},
};