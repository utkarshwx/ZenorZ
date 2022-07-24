const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
		.setName('8ball')
		.setDescription('🎱 Can\'t make your mind up? Porphets head will guide you')
		//.addUserOption(option => option.setName('user').setDescription('The member to kick from vc').setRequired(true)),
        .addStringOption(option => option.setName('query').setDescription('what you want to ask?').setRequired(true)),
    async execute(interaction, args, client) {
      var fortunes = [
        "Yes.",
        "It is certain.",
        "It is decidedly so.",
        "Without a doubt.",
        "Yes definelty.",
        "You may rely on it.",
        "As I see it, yes.",
        "Most likely.",
        "Outlook good.",
        "Signs point to yes.",
        "Reply hazy, try again.",
        "Ask again later.",
        "Better not tell you now...",
        "Cannot predict now.",
        "Concentrate and ask again.",
        "Don't count on it.",
        "My reply is no.",
        "My sources say no.",
        "Outlook not so good...",
        "Very doubtful.",
      ];
      const ran = fortunes[Math.floor(Math.random() * fortunes.length)]
      await interaction.reply({
        content: [ran],
        ephemeral: true
      }
      );
    }
  }