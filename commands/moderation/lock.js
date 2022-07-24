const {
    Permissions
  } = require("discord.js");
  const { SlashCommandBuilder } = require("@discordjs/builders");
  
  module.exports = {
    data: new SlashCommandBuilder()
      .setName("lock")
      .setDescription("Lock a channel in your server!"),
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
        interaction.channel.permissionOverwrites.set([{ id: interaction.guild.id, deny: [Permissions.FLAGS.SEND_MESSAGES]},]).then(async () => {
            await interaction.reply({
              content : `Channel has been locked <#${interaction.channel.id}>!`,
              ephemeral: true
            });
          });

    }}