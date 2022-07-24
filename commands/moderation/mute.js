const { SlashCommandBuilder } = require("@discordjs/builders");
const { Permissions } = require("discord.js");
const ms = require('ms');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("mute")
    .setDescription(
      "Mutes a member in your server (which prevents them from talking)!"
    )
    
    .addUserOption((option) =>
      option
        .setName("member")
        .setDescription("Select a member to mute")
        .setRequired(true)
    )
    .addStringOption((option =>
      option
        .setName("time")
        .setDescription("for how much time")
        .setRequired(true)
        .addChoice('Remove mute', '0')
        .addChoice('1 Minute', '1')
        .addChoice('5 Minute', '5')
        .addChoice('10 Minute', '10')
        .addChoice('1 hour', '60')
        .addChoice('1 day', '1440')
        .addChoice('1 week', '10080'))       
    )
    .addStringOption((option) =>
        option
          .setName("reason")
          .setDescription("The reason for the mute")
          .setRequired(false)
      ),
  async execute(interaction, client) {
    
    var user = interaction.options.getUser("member");
    var member = interaction.options.getMember("member")
    var time = interaction.options.getString("time");
    var reason = interaction.options.getString("reason") || "No reason provided!";

    if (!interaction.member.permissions.has(Permissions.FLAGS.MODERATE_MEMBERS))
      return interaction.reply({
        content:
          "You don't have the `TIMEOUT_MEMBERS` permission so you can't run this command!",
        ephemeral: true,
      });
    if (!interaction.guild.me.permissions.has(Permissions.FLAGS.MODERATE_MEMBERS))
      return interaction.reply({
        content: "`TIMEOUT_MEMBERS` permission for this command is missing!",
        ephemeral: true,
      });

    if (
      !member.moderatable ||
      member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)
    )
      return await interaction.reply({
        content: "I can't ban this member!",
        ephemeral: true,
      });

    if (user.id == interaction.user.id)
      return interaction.reply({
        content: "You can't mute yourself!",
        ephemeral: true,
      });
    if (user.id == client.user.id)
      return interaction.reply({
        content: "You can't mute the client!",
        ephemeral: true,
      });
      
      member.timeout(`${time}` * 60 * 1000, `${reason}`)
      
        interaction.reply({content: `Muted for ${time}min`, ephemeral: true})
    
  },
};