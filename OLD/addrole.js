const { SlashCommandBuilder } = require("@discordjs/builders");
const { Permissions } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("addrole")
    .setDescription(
      "Adds a role on member in your server!"
    )
    .addUserOption((option) =>
      option
        .setName("member")
        .setDescription("Select a member to add role")
        .setRequired(true)
    )
    .addRoleOption((option) =>
      option
        .setName("role")
        .setDescription("Select role")
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
        content: "You can't add role on yourself!",
        ephemeral: true,
      });
    if (user.id == client.user.id)
      return await interaction.editReply({
        content: "You can't add role on me!",
        ephemeral: true,
      });

    await member.roles.add(muted_role);
    await interaction.editReply({
      content: "Added that role on member!",
      ephemeral: true,
    });
  },
};