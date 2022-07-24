const Command = require('../../Structures/Command.js');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

    async run(message, client) {
        {
            const mcembed = new MessageEmbed()
    
                .addField('Member',[
            ` ${message.guild.memberCount}`])
                .setFooter(message.guild.name)
                message.channel.send(mcembed)
        }
    }
};