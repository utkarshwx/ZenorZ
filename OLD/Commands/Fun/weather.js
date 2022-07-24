const Command = require('../../Structures/Command');
const { MessageEmbed } = require ('discord.js');
const weather = require('weather-js');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			
		});
	}

	async run(message, args) {
		if (!args[0]) return message.channel.send("Please Give Location!");
		
			weather.find({ search: args.join(" ") }, function(error, result) {
			  if (error) return message.channel.send(`Something Went Wrong, Try Again Later!`);
		
			  if (result === undefined || result.length === 0)
				return message.channel.send(
				  `Invalid Location, Please Give Valid Location!`
				);
		
			  var current = result[0].current;
			  var location = result[0].location;
		
			  const Weather = new MessageEmbed()
				.setColor(`#000000`)
				.setTitle(`${location.name} Weather!`)
				.setDescription(`${current.skytext}`)
				.addField("Temperature", `${current.temperature}°${location.degreetype}`, true)
				.addField("Humidity", `${current.humidity}%`, true)
				.addField("Wind", current.winddisplay, true)
				.addField("Feels Like", `${current.feelslike}°`, true)
				.addField("Timezone", `UTC${location.timezone}`, true)
				.setFooter("Powered by : ZENORZ");
		
			  message.channel.send(Weather);
			});
	}

};