const Command = require('../../Structures/Command.js');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

    async run(message, args) {
        
			const coins = ["Heads", "Tails"];
		
			const cembed = new MessageEmbed()
			  .setColor('#00000')
			  .setTitle(`Coin Is ${coins[Math.floor(Math.random() * coins.length)]}`)
			  		
			message.channel.send(cembed);
    }
};