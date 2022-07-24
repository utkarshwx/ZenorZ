const { SlashCommandBuilder } = require("@discordjs/builders");
const { Permissions } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("unmute")
    .setDescription(
      "Unmutes a member in your server (which allows them to talk)!"
    )
    .addUserOption((option) =>
      option
        .setName("member")
        .setDescription("Select a member to unmute")
        .setRequired(true)
    )
    .addRoleOption((option) =>
      option
        .setName("mute_role")
        .setDescription("Select your muted role")
        .setRequired(true)
    ),
  async execute(interaction, client) {
    if (!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_ROLES))
      return await interaction.reply({
        content:
          "You don't have the `MANAGE_ROLES` permission so you can't run this command!",
        ephemeral: true,
      });
    if (!interaction.guild.me.permissions.has(Permissions.FLAGS.MANAGE_ROLES))
      return await interaction.reply({
        content: "I require the `MANAGE_ROLES` permission for this command!",
        ephemeral: true,
      });
    await interaction.deferReply({ ephemeral: true });
    var user = interaction.options.getUser("member");
    var member = interaction.options.getMember("member");
    var muted_role = interaction.options.getRole("mute_role");

    if (user.id == interaction.user.id)
      return await interaction.editReply({
        content: "You can't unmute yourself!",
        ephemeral: true,
      });
    if (user.id == client.user.id)
      return await interaction.editReply({
        content: "You can't unmute the client!",
        ephemeral: true,
      });

    await member.roles.remove(muted_role);
    await interaction.editReply({
      content: "Unmuted that member!",
      ephemeral: true,
    });
  },
};