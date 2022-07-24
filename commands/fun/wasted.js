const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageAttachment } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("wasted")
    .setDescription("Wasted.")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("Select a user to put into the wasted image")
        .setRequired(true)
    ),
  async execute(interaction) {
    var user = interaction.options.getUser("user");
    var link = `https://some-random-api.ml/canvas/wasted?avatar=${user.displayAvatarURL(
      { dynamic: false, format: "png", size: 512 }
    )}`;
    const attachment = new MessageAttachment(link, "wasted.png");
    await interaction.reply({
      files: [attachment],
    });
  },
};