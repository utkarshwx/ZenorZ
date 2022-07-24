const {
    Permissions,
    MessageEmbed,
    MessageActionRow,
    MessageButton,
  } = require("discord.js");
  const { SlashCommandBuilder } = require("@discordjs/builders");
  
  module.exports = {
    data: new SlashCommandBuilder()
      .setName("slowmode")
      .setDescription("Add a slowmode in a channel in your server!")
      .addIntegerOption((option) =>
      option
        .setName("time")
        .setDescription("Type in seconds of slowmode")
        .setRequired(true)
    ),
    options: {
      guildOnly: false,
    },
    async execute(interaction, client) {
        if (!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS))
        return await interaction.reply({
          content:
            "You don't have the `MANAGE_CHANNELS` permission, so you can't run this command!",
          ephemeral: true,
        });
      if (
        !interaction.guild.me.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)
      )
        return await interaction.reply({
          content: "I require the `MANAGE_CHANNELS` permission for this command!",
          ephemeral: true,
        });
        const slowmode_time = interaction.options.getInteger("time");
        interaction.channel.setRateLimitPerUser(slowmode_time).then(async () => {
            await interaction.reply({
              content : `Slowmode applied for ${slowmode_time} in <#${interaction.channel.id}>!`,
              ephemeral: true
            });
          });
    },
  };