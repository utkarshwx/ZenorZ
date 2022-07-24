const { SlashCommandBuilder } = require("@discordjs/builders");
const { Permissions } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("removerole")
    .setDescription(
      "Removes a role from the member!"
    )
    .addUserOption((option) =>
      option
        .setName("member")
        .setDescription("Select a member to remove role")
        .setRequired(true)
    )
    .addRoleOption((option) =>
      option
        .setName("role")
        .setDescription("Select remove role")
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
    var muted_role = interaction.options.getRole("role");

    if (user.id == interaction.user.id)
      return await interaction.editReply({
        content: "You can't remove role from yourself!",
        ephemeral: true,
      });
    if (user.id == client.user.id)
      return await interaction.editReply({
        content: "You can't remove role from the client!",
        ephemeral: true,
      });

    await member.roles.remove(muted_role);
    await interaction.editReply({
      content: "removed that role from member!",
      ephemeral: true,
    });
  },
};