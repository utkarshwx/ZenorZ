const {
    Client,
    CommandInteraction,
    MessageEmbed,
    MessageActionRow,
    MessageButton,
    Message,
    ButtonInteraction,
    ThreadChannel
} = require('discord.js');
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
   /* name: 'ticket',
    description: 'Opens a ticket',
    options: [{
        name: 'reason',
        description: 'Provide a reason for your ticket',
        type: 'STRING',
        required: true,
        choices: [{
                name: 'General Inquiry',
                value: 'General Inquiry'
            },
            {
                name: 'Bug Report',
                value: 'Bug Report'
            },
            {
                name: 'Feature Request',
                value: 'Feature Request'
            }
        ]
    }],*/
    data: new SlashCommandBuilder()
    .setName("ticket")
    .setDescription(
      "opens a ticket"
    )
    .addStringOption((option =>
      option
        .setName("reason")
        .setDescription("provide reson for ticket")
        .setRequired(true)
        .addChoice('General Inquiry', 'General Inquiry')
        .addChoice('Bug Report', 'Bug Report')
        .addChoice('Feature Request', 'Feature Request'))
    ),

    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {Guild} guild
     * @param {Message} message
     */
    async execute(interaction, client, message) {
        const result = Math.random()
            .toString(36)
            .substring(2, 7)
        const User = interaction.user;
        const logsChannelId = '911722153316081704'
        const logsChannel = interaction.guild.channels.cache.get(logsChannelId)
        const supportChannelId = '911722098941108274'
        const supportChannel = interaction.guild.channels.cache.get(supportChannelId        )
        const ticketChannel = await supportChannel.threads.create({
            name: `${User.tag}-${result}`,
            autoArchiveDuration: 60,
            reason: `User created a ticket`
        })
        const ticketReason = interaction.options.getString('reason')

        const newTicket = new MessageEmbed()
            .setColor('YELLOW')
            .setAuthor(
                'New Ticket Created',
                `${User.displayAvatarURL({ dynamic: true })}`
            )
            .setDescription(`Ticket Created by ${User}`)
            .addField('Reason', `${ticketReason}`)
            .addField('Ticket Channel', `${ticketChannel}`)
            .setThumbnail(`${User.displayAvatarURL({ dynamic: true })}`)
        logsChannel.send({ embeds: [newTicket] })
        interaction.reply(`A ticket has been created! Check it out ${ticketChannel}`)
        const ticketManage = new MessageEmbed()
            .setColor('YELLOW')
            .setAuthor('Thanks for creating a ticket!')
            .setThumbnail(`${User.displayAvatarURL({ dynamic: true })}`)
            .setDescription(`Ticket Created by ${User}`)
            .addField('Reason', `${ticketReason}`)
            .addField('While you\'re waiting...','Leave a description of your issue and we\'ll get to it ASAP')
            .addField('Close this ticket', `Close this ticket by clicking the 🔒`)
            

        const CloseTicket = new MessageActionRow().addComponents(
            new MessageButton()
            .setCustomId('closeticket')
            .setLabel(`🔒 Close Ticket`)
            .setStyle('SUCCESS')
        )
        ticketChannel.send({ content: ` ${User}`, embeds: [ticketManage] }).then(sentMessage => {
            sentMessage.react(`🔒`)
        });
        try {
            let collected = await message.awaitReactions({filter, max: 1, time: 60000, errors: ['time'] })
            let reaction = collected.first()
          } catch (e) {
            // Did not react in time
          }
          
    }
}