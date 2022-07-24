const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, MessageActionRow, MessageSelectMenu, MessageButton} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Shows Help menu!")
    .addStringOption(option =>
      option
        .setName("command")
        .setDescription("command type")
        .setRequired(true)
        .addChoice('Moderation', '0')
        .addChoice('Fun', '1')
        .addChoice('Utility', '2')
        //.addChoice('1 week', '10080')       
    ),
  async execute(interaction, client) {

    var cmd = interaction.options.getString("command");

    const row = new MessageActionRow().addComponents(
      new MessageButton()
        .setStyle("LINK")
        .setLabel('INVITE')
        .setURL(`https://discord.com/oauth2/authorize?client_id=807153847708811274&permissions=8&scope=bot%20applications.commands`),
      new MessageButton()
        .setStyle("LINK")
        .setLabel("VOTE")
        .setURL('https://top.gg/bot/807153847708811274/vote')
    );

    if(cmd === '0'){
      const mod = new MessageEmbed()
	.setColor('#FFD700')
	.setTitle('Help section')
	//.setAuthor('ZENORZ')
	.setDescription('See below for a list of support topics.')
	.addFields(
		{ name: '\u200B', value: '\u200B' },
		{ name: 'MODERATION', value: 'ADDROLE, BAN, KICK, MUTE, NICKNAME, REMOVEROLE, UNBAN, UNMUTE, VOICEMUTE, SLOWMODE, LOCK, UNLOCK, PURGE', inline: true },
	)
      return await interaction.reply({      
        ephemeral: true,
        components: [row],
        embeds: [mod]
      });
    }
    if(cmd === '1'){

      const fun = new MessageEmbed()
	.setColor('#FFD700')
	.setTitle('Help section')
	//.setAuthor('ZENORZ')
	.setDescription('See below for a list of support topics.')
	.addFields(
		{ name: '\u200B', value: '\u200B' },		
		{ name: 'FUN', value: 'JAIL, JOKE, MEME, WASTED, 8BALL', inline: true },		
	)
      return await interaction.reply({      
        ephemeral: true,
        components: [row],
        embeds: [fun]
      });
    }
    if (cmd === '2'){

      const util = new MessageEmbed()
	.setColor('#FFD700')
	.setTitle('Help section')
	//.setAuthor('ZENORZ')
	.setDescription('See below for a list of support topics.')
	.addFields(
		{ name: '\u200B', value: '\u200B' },
    { name: 'UTILITY', value: 'AVATAR, USERINFO, PING, MEMBERCOUNT, REMIND ME, WEATHER, BOTINFO', inline: true },
		
	)

      interaction.reply({      
        ephemeral: true,
        components: [row],
        embeds: [util]
      });
    }
  }
};