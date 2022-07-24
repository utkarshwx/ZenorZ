const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, Permissions } = require("discord.js");


module.exports = {
  data: new SlashCommandBuilder()
    .setName("role")
    .setDescription('Command moves around role')
    .addSubcommand(subcommand =>
      subcommand
        .setName('add')
        .setDescription('Adds a role on member in your server!')
        .addRoleOption(option => option.setName('role').setDescription('select role to be added to member').setRequired(true))
        .addUserOption((option) =>
      option
        .setName("member")
        .setDescription("Select a member to add role")
        .setRequired(true)
    ))

    .addSubcommand(subcommand =>
      subcommand
        .setName('remove')
        .setDescription('Removes a role from the member!')
        .addRoleOption(option => option.setName('role').setDescription('select role to be removed from a member').setRequired(true))
        .addUserOption((option) =>
      option
        .setName("member")
        .setDescription("Select a member to add role")
        .setRequired(true)
        )
            ),
  options: {
    guildOnly: false,
  },
  async execute(interaction, client) {
    if (interaction.options.getSubcommand() === "add") {
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
  } else if (interaction.options.getSubcommand() === "remove") {
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
  });}
 /* else if (interaction.options.getSubcommand() === "info"){
      interaction.reply('under work');

  }
  else if (interaction.options.getSubcommand() === "update"){
    interaction.reply('working');
    const role = interaction.options.getRole('role');
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
    const name = interaction.options.getString('name'),
          color = interaction.options.getString('color'),
          hoist = interaction.options.getString('hoist'),
          mention = interaction.options.getString('mentionable');
          interaction.reply('under work');
                */

  }

};
