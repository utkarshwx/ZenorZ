const { SlashCommandBuilder } = require('@discordjs/builders');
const {
    Permissions,
    MessageEmbed,
    MessageActionRow,
    MessageButton,
  } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('voicemute')
		.setDescription('Select a member and give vc mute')
		.addUserOption(option => option.setName('user').setDescription('The member to get vc mute').setRequired(true))
        .addStringOption(option => option.setName('reason').setDescription('Reason for giving vc mute').setRequired(false)),
	async execute(interaction, client ) {
		//const member = interaction.options.get('user').value;            

		if (!interaction.member.permissions.has(Permissions.FLAGS.MUTE_MEMBERS))
        return await interaction.reply({
          content: "You can't run this command!",
          ephemeral: true,
        });

		const user = interaction.options.getUser('user');
			  const member = interaction.options.getMember('user') || interaction.user;
		  	const reason = interaction.options.getString('reason') || 'No reason provided';

			  if (user.id == interaction.user.id)
        return await interaction.reply({
          content: "You can't mute yourself!",
          ephemeral: true,
        });
		
		try {
		member.voice.setMute(true, reason);
            interaction.reply("Member was Voice Muted!")
		}

		catch(error) {
            console.log(error);
            interaction.reply("Oops! An unknown error occured. Please try again later.")
        }
	},
};