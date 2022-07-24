const { Client, CommandInteraction, MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require("@discordjs/builders");
module.exports = {
    data: new SlashCommandBuilder()
      .setName("membercount")
      .setDescription("Count of members"),
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction, client) {
        const { guild } = interaction;
        const embed = new MessageEmbed()
            .setColor("RED")
            .setTitle(`Member Count of ${guild}`)
            .setDescription(`Total: ${guild.members.cache.size}\n Members: ${guild.members.cache.filter(member => !member.user.bot).size}\nBots: ${guild.members.cache.filter(member => member.user.bot).size}`, true)
            .setThumbnail(guild.iconURL({ dynamic: true }))

        interaction.reply({ embeds: [embed], ephemeral: true })
    }
}