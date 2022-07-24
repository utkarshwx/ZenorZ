const { SlashCommandBuilder } = require("@discordjs/builders");
const wait = require("util").promisify(setTimeout);

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Returns the average ping of the client!"),
  options: {
    guildOnly: false,
  },
  async execute(interaction, client) {
    await interaction.reply({
      content: `Pinging... `,
      ephemeral: true,
    });
    await wait(5000);
    await interaction.editReply({
      content: `Pong! **${client.ws.ping}ms**`,
      ephemeral: true,
    });
  },
};