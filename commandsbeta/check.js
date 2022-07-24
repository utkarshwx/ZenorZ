const { SlashCommandBuilder } = require("@discordjs/builders");
const wait = require("util").promisify(setTimeout);

module.exports = {
  data: new SlashCommandBuilder()
    .setName("check")
    .setDescription("Returns the details of the user in the guild!")
    .addUserOption((option) =>
        option
          .setName("user")
          .setDescription("The user to get info")
          .setRequired(true)
      ),
  options: {
    guildOnly: false,
  },
  async execute(interaction, client) {
    const user = interaction.options.getUser('user');
    const member = interaction.options.getMember('user'),
    guild = interaction.guild;
    interaction.reply({
        content: `Information of ${member.tag} (ID:${member.id}):\nMuted: \nBanned:${guild.bans.fetch(member.id)}`
    })
  },
};