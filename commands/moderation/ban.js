const {
    Permissions,
    MessageEmbed,
    MessageActionRow,
    MessageButton,
  } = require("discord.js");
  const { SlashCommandBuilder } = require("@discordjs/builders");
  
  module.exports = {
    data: new SlashCommandBuilder()
      .setName("ban")
      .setDescription("Ban a member from your server for breaking your rules!")
      .addUserOption((option) =>
        option
          .setName("user")
          .setDescription("The user to ban.")
          .setRequired(true)
      )
      .addIntegerOption((option) =>
        option
          .setName("days")
          .setDescription("How many days of messages to delete")
          .setRequired(false)
      )
      .addStringOption((option) =>
        option
          .setName("reason")
          .setDescription("The reason for the ban.")
          .setRequired(false)
      ),
    options: {
      guildOnly: false,
    },
    async execute(interaction, client) {
      var user = interaction.options.getUser("user");
      var member = interaction.options.getMember("user");
      var days = interaction.options.getInteger("days") || 0;
      var reason =
        interaction.options.getString("reason") || "No reason provided!";
  
      // console.log(user.id, member, days, reason)
      if (!interaction.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS))
        return await interaction.reply({
          content: "You can't run this command!",
          ephemeral: true,
        });
      if (!interaction.guild.me.permissions.has(Permissions.FLAGS.BAN_MEMBERS))
        return await interaction.reply({
          content: "I can't run this command!",
          ephemeral: true,
        });
      if (user.id == client.user.id)
        return await interaction.reply({
          content: "You can't ban the client!",
          ephemeral: true,
        });
      if (user.id == interaction.user.id)
        return await interaction.reply({
          content: "You can't ban yourself!",
          ephemeral: true,
        });
      if (
        !member.bannable ||
        member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)
      )
        return await interaction.reply({
          content: "I can't ban this member!",
          ephemeral: true,
        });
      if (days < 0 || days > 7)
        return await interaction.reply({
          content: "Invalid day number, this should be between 0 and 7.",
          ephemeral: true,
        });
  
          member.ban({ days: days, reason: reason });
          const embed = new MessageEmbed()
            .setColor("RED")
            .setTitle("Member Banned")
            .setDescription("Successfully banned that member.")
            .addFields([
              {
                name: "Member",
                value: `<@${user.id}>`,
              },
              {
                name: "Days of Messages Deleted",
                value: `${days}`,
              },
              {
                name: "Reason",
                value: `${reason}`,
              },
            ]);
          const log_embed = new MessageEmbed()
            .setColor("RED")
            .setTitle("Member Banned")
            .setDescription("A member was banned.")
            .addFields([
              {
                name: "Member",
                value: `<@${user.id}>`,
              },
              {
                name: "Days of Messages Deleted",
                value: `${days}`,
              },
              {
                name: "Reason",
                value: `${reason}`,
              },
            ]);
          await interaction.reply({
            content: "Successfully banned that member!",
            embeds: [embed],
            ephemeral: false,
            components: [],
          });
          // log.send({
          //   embeds: [
          //     log_embed
          //   ]
          // })
    },
  };