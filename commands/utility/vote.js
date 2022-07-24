const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageButton, MessageActionRow } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("vote")
    .setDescription("Returns the link to vote bot"),
  options: {
    guildOnly: false,
  },
  async execute(interaction, client) {
    const row = new MessageActionRow().addComponents(new MessageButton()
    .setStyle("LINK")
    .setLabel("VOTE")
    .setURL('https://top.gg/bot/807153847708811274/vote')); 
    interaction.reply({ 
        content: "Vote the bot so that we can upgrade bot",
     components: [row] })
  },
};