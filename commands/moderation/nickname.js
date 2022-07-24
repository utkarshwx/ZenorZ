const {
    Permissions,
    MessageEmbed,
    MessageActionRow,
    MessageButton,
  } = require("discord.js");
  const { SlashCommandBuilder } = require("@discordjs/builders");
  
  module.exports = {
    data: new SlashCommandBuilder()
      .setName("nickname")
      .setDescription("Add a nickname of a member in your server!")
      .addUserOption((option) =>
        option
          .setName("user")
          .setDescription("The user to nick")
          .setRequired(true)
      )
      .addStringOption((option) =>
        option
          .setName("nick")
          .setDescription("The nick you want to give")
          .setRequired(true)
      )
      .addStringOption((option) =>
        option
          .setName("reason")
          .setDescription("The reason for the nick")
          .setRequired(false)
      ),
    options: {
      guildOnly: false,
    },
    async execute(interaction, client) {
      var user = interaction.options.getUser("user");
      var member = interaction.options.getMember("user");
      var nickname = interaction.options.getString('nick');
      var reason =
        interaction.options.getString("reason") || "No reason provided!";
  
      // console.log(user.id, member, days, reason)
      if (!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_NICKNAMES))
        return await interaction.reply({
          content: "You can't run this command!",
          ephemeral: true,
        });
      if (!interaction.guild.me.permissions.has(Permissions.FLAGS.MANAGE_NICKNAMES))
        return await interaction.reply({
          content: "I can't run this command!",
          ephemeral: true,
        });
      if (user.id == client.user.id)
        return await interaction.reply({
          content: "You can't nick the client!",
          ephemeral: true,
        });
        if (nickname.length >= 32) return interaction.reply({ content: 'Type Short Nick', ephemeral: true});
        if (nickname.length !== 0) {
            member.setNickname(nickname || null)
        interaction.reply({content: 'successfully done'});
        }     

    },
  };