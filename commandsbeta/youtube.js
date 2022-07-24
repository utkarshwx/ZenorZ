const { SlashCommandBuilder } = require("@discordjs/builders");

const { Client } = require('discord.js')

require('dotenv').config();

module.exports = {
    data: new SlashCommandBuilder()
    .setName('youtube')
    .setDescription('Let\'s you create an Activity in a VC!'),
    async execute(interaction , client) {
    const member = client.guilds.cache.get(interaction.guild.id).members.cache.get(interaction.member.id)

    if(!member.voice.channelID){
      interaction.reply('you need to join');
    }
    client.discordTogether.createTogetherCode(member.voice.channelID, 'youtube').then(async(invite)=>{
      interaction.reply(`[join](${invite.code})`)
    })
    }
};