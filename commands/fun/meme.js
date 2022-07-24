const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("meme")
    .setDescription("Gets a random meme and sends it in an embed!"),
  options: {
    guildOnly: false,
  },
  async execute(interaction) {
    await interaction.deferReply();
    const fetch = await import("node-fetch");
    var link = "https://some-random-api.ml/meme";

    console.log("Running GET request...");
    const r = await fetch.default(link, {
      method: "GET",
    });
    var data = await r.json();

    var meme_caption = data.caption;
    var meme_image = data.image;
    var meme_category = data.category;

    const meme_embed = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle(meme_caption)
      .setImage(meme_image)
      .setFooter(
        `${interaction.user.username} requested this. | Category: ${meme_category}`
      );
    await interaction.followUp({
      embeds: [meme_embed],
    });
  },
};