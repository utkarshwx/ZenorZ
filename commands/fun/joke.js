const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("joke")
    .setDescription(
      "Returns a random joke for you and your friends to laugh at"
    ),
  async execute(interaction) {
    const fetch = await import("node-fetch");
    await interaction.deferReply();
    var link = "https://some-random-api.ml/joke";
    var f = await fetch.default(link, {
      method: "GET",
    });
    var data = await f.json();
    await interaction.editReply({ content: `${data.joke}` });
  },
};