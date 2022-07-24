const { SlashCommandBuilder } = require("@discordjs/builders");
const { utc } = require("moment");
const { MessageEmbed } = require("discord.js");

const flags = {
  DISCORD_EMPLOYEE: "Discord Employee",
  DISCORD_PARTNER: "Discord Partner",
  BUGHUNTER_LEVEL_1: "Bug Hunter (Level 1)",
  BUGHUNTER_LEVEL_2: "Bug Hunter (Level 2)",
  HYPESQUAD_EVENTS: "HypeSquad Events",
  HOUSE_BRAVERY: "House of Bravery",
  HOUSE_BRILLIANCE: "House of Brilliance",
  HOUSE_BALANCE: "House of Balance",
  EARLY_SUPPORTER: "Early Supporter",
  TEAM_USER: "Team User",
  SYSTEM: "System",
  VERIFIED_BOT: "Verified Bot",
  VERIFIED_DEVELOPER: "Verified Bot Developer",
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName("userinfo")
    .setDescription("Shows info of a user (or yourself)!")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("Choose a user to look for")
        .setRequired(false)
    ),
  options: {
    guildOnly: false,
  },
  async execute(interaction) {
    await interaction.deferReply();
    const user = interaction.options.getUser("user") || interaction.user;
    const member = interaction.guild.members.cache.get(user.id);
    function checkBot(u) {
      if (u.bot) return "Yes";
      else return "No";
    }
    const roles = member.roles.cache
      .sort((a, b) => b.position - a.position)
      .map((role) => role.toString())
      .slice(0, -1);
    const userFlags = user.flags.toArray();
    const userArray = [
      `**❯ Username:** ${user.username}`,
      `**❯ Discriminator:** ${user.discriminator}`,
      `**❯ Tag:** ${user.tag}`,
      `**❯ ID:** ${user.id}`,
      `**❯ Is Bot?** ${checkBot(user)}`,
      `**❯ Flags:** ${
        userFlags.length
          ? userFlags.map((flag) => flags[flag]).join(", ")
          : "None"
      }`,
      `**❯ Time Created:** ${utc(user.createdTimestamp).format("LT")} - ${utc(
        user.createdTimestamp
      ).format("LL")} | ${utc(user.createdTimestamp).fromNow()}`,
      `\u200b`,
    ];
    const memberArray = [
      `**❯ Highest Role:** ${
        member.roles.highest.id === interaction.guild.id
          ? "None"
          : member.roles.highest.name
      }`,
      `**❯ Joined Server At:** ${utc(member.joinedAt).format("LL LTS")} | ${utc(
        member.joinedAt
      ).fromNow()}`,
      `**❯ Hoisted Role:** ${
        member.roles.hoist ? member.roles.hoist.name : "None"
      }`,
    ];
    const embed = new MessageEmbed()
      .setThumbnail(`${user.displayAvatarURL({ dynamic: true })}`)
      .setTitle(`Info on ${user.username}`)
      .setColor(member.displayHexColor || "BLUE")
      .addField("User", `${userArray.join("\n")}`)
      .addField("Member", `${memberArray.join("\n")}`);
    await interaction.followUp({
      embeds: [embed],
    });
  },
};