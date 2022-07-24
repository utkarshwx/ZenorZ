const { SlashCommandBuilder } = require("@discordjs/builders");
const { Permissions } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("unban")
    .setDescription("Unbans a member from the current server!")
    .addStringOption((option) =>
      option
        .setName("userid")
        .setDescription("Type in the ID of the user to unban")
        .setRequired(true)
    ),
  options: {
    guildOnly: false,
  },
  async execute(interaction, client) {
    if (!interaction.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS))
      return await interaction.reply({
        content:
          "You don't have the `BAN_MEMBERS` permission, so you can't run this command!",
        ephemeral: true,
      });
    if (!interaction.guild.me.permissions.has(Permissions.FLAGS.BAN_MEMBERS))
      return await interaction.reply({
        content: "I can't run this command!",
        ephemeral: true,
      });
    const id = interaction.options.getString("userid");

    interaction.guild.members
      .unban(id)
      .then(async (user) => {
        return await interaction.reply({
          content: `Unbanned **${user.tag}** from the guild!`,
        });
      })
      .catch(async () => {
        return await interaction.reply({
          content:
            "This member is **NOT** on the ban list, look at the ban list to see who's banned!",
          ephemeral: true,
        });
      });
  },
};