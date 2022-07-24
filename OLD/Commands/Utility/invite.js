const Command = require('../../Structures/Command.js');
const {MessageEmbed} = require('discord.js')
module.exports = class extends Command {

    async run(message, client) {
        let iembed = new MessageEmbed()
        .setColor('')
        .setTitle(`**INVITE LINK**`)
        .setDescription('[**INVITE LINK**](https://discord.com/oauth2/authorize?client_id=807153847708811274&scope=bot&permissions=8)')
        .setFooter(`Powered by Zenorz`);
        message.channel.send(iembed);
    }
};