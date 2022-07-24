const Command = require('../../Structures/Command.js');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

    async run(message, args) {
        if (!message.member.hasPermission(["MANAGE_MESSAGES"])) return message.reply("**You Dont Have Permissions To USE! - [MANAGE_MESSAGES]**");
        let color = args[0];
        if (!color) return message.channel.send("No color provided! like (#da0214)");
        let msg = message.content.slice(message.content.indexOf(args[1]), message.content.length);

        if (!msg) return message.channel.send("No message provided!");


        let emb = new MessageEmbed()

            .setColor(color)
            .setDescription(msg)
            //.setTimestamp()
            .setThumbnail(message.author.displayAvatarURL)
        message.channel.send(emb)

        
    
    }
};