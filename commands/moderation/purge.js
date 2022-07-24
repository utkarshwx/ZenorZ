const { SlashCommandBuilder } = require("@discordjs/builders");
const { Permissions } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("purge")
    .setDescription(
      "Purge a certain number of messages from the current channel!"
    )
    .addIntegerOption((option) =>
      option
        .setName("messages")
        .setDescription("Type in a number of messages to purge")
        .setRequired(true)
    ),
  options: {
    guildOnly: false,
  },
  async execute(interaction, client) {
    if (!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES))
      return await interaction.reply({
        content:
          "You don't have the `MANAGE_MESSAGES` permission, so you can't run this command!",
        ephemeral: true,
      });
    if (
      !interaction.guild.me.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)
    )
      return await interaction.reply({
        content: "I require the `MANAGE_MESSAGES` permission for this command!",
        ephemeral: true,
      });
    const number_to_delete = interaction.options.getInteger("messages");
    if (number_to_delete > 100)
      return await interaction.reply(
        "You can only purge 100 messages at a time!"
      );
    interaction.channel.bulkDelete(number_to_delete).then(async () => {
      await interaction.reply({ content :`Purged ${number_to_delete} messages from <#${interaction.channel.id}>!`, ephemeral: true }
      );
    });
  },
};