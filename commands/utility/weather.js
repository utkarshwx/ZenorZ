const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const weather = require("weather-js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("weather")
    .setDescription("View weather information on a given location")
    .addStringOption((option) =>
      option
        .setName("location")
        .setDescription("The location to search for")
        .setRequired(true)
    ),
  async execute(interaction) {
    
    var location = interaction.options.getString("location");

    weather.find({ search: location }, async (error, result) => {
      
        var current = result[0].current;
        var location = result[0].location;

        //console.log(current, location)
        // return await interaction.reply({ content: 'Check the console!', ephemeral: true })

        const weather_embed = new MessageEmbed()
          .setColor(interaction.member.displayHexColor || "RANDOM")
          .setTitle(`Weather for ${location.name}`)
          .setDescription(`${current.skytext}`)
          .setThumbnail(current.imageUrl)
          .addField("Temperature", `${current.temperature}°${location.degreetype}`, true)
          .addField("Humidity", `${current.humidity}%`, true)
          .addField("Wind", current.winddisplay, true)
          .addField("Feels Like", `${current.feelslike}°${location.degreetype}`, true)
          .addField("Timezone", `UTC${location.timezone}`, true)
      
        interaction.reply({
          embeds: [weather_embed],
          ephemeral: true,
        });
      
    });
  },
};